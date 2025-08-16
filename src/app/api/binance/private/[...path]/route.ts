import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError, Method } from "axios";
import { sign } from "tweetnacl";
import { decodeBase64, decodeUTF8, encodeBase64 } from "tweetnacl-util";
import { createErrorResponse } from "@/shared/lib/api-error";

const testnetBaseUrl = process.env.NEXT_PUBLIC_BINANCE_REST_API_URL;

interface BinanceServerTime {
  serverTime: number;
}

interface HandlerContext {
  params: {
    path: string[];
  };
}

async function handler(request: NextRequest, { params }: HandlerContext) {
  const apiKey = request.headers.get("X-API-KEY");
  const apiSecret = request.headers.get("X-SECRET-KEY");

  if (!apiKey || !apiSecret) {
    return createErrorResponse(
      401,
      "API ключ и/или секретный ключ отсутствуют в заголовках запроса.",
    );
  }

  let serverTime: number;

  try {
    const timeResponse = await axios.get<BinanceServerTime>(
      `${testnetBaseUrl}/time`,
    );
    serverTime = timeResponse.data.serverTime;
  } catch (error) {
    console.error("Не удалось получить время с сервера Binance:", error);
    return createErrorResponse(500, "Ошибка синхронизации времени с Binance");
  }

  const binancePath = params.path.join("/");
  const method = request.method as Method;
  const searchParams = request.nextUrl.searchParams;
  let body: Record<string, unknown> = {};

  if (method === "POST" || method === "PUT" || method === "DELETE") {
    const bodyText = await request.text();
    if (bodyText) {
      try {
        body = JSON.parse(bodyText);
      } catch (e) {
        return createErrorResponse(400, "Неверный формат тела запроса.");
      }
    }
  }

  const allParams: Record<string, string | number> = {};
  searchParams.forEach((value, key) => {
    allParams[key] = value;
  });
  Object.assign(allParams, body);

  const queryString = new URLSearchParams({
    ...allParams,
    timestamp: serverTime.toString(),
  }).toString();

  let signature: string;
  try {
    const pem = apiSecret
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .replace(/\n/g, "");

    const der = decodeBase64(pem);
    const seed = der.slice(der.length - 32);
    const keyPair = sign.keyPair.fromSeed(seed);
    const signatureBytes = sign.detached(
      decodeUTF8(queryString),
      keyPair.secretKey,
    );
    signature = encodeBase64(signatureBytes);
  } catch (e) {
    return createErrorResponse(
      400,
      "Неверный формат секретного или публичного ключа.",
    );
  }

  const finalUrl = `${testnetBaseUrl}/${binancePath}?${queryString}&signature=${signature}`;
  try {
    const response = await axios({
      method,
      url: finalUrl,
      headers: {
        "X-MBX-APIKEY": apiKey,
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log(axiosError.response);
    }

    if (axios.isAxiosError(error) && error.response?.data.code === -1022) {
      const axiosError = error as AxiosError;
      return createErrorResponse(
        500,
        "Неверные ключи API. Проверьте их и повторите запрос.",
        undefined,
        axiosError.code,
      );
    }
    return createErrorResponse(
      500,
      "Неизвестная ошибка при выполнении запроса к Binance API",
    );
  }
}

export { handler as GET, handler as POST, handler as DELETE, handler as PUT };
