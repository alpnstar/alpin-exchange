import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios, { AxiosError, Method } from "axios";

const apiKey = process.env.NEXT_PUBLIC_BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_SECRET_KEY;
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
  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "API ключи не настроены" },
      { status: 500 },
    );
  }

  let serverTime: number;

  try {
    const timeResponse = await axios.get<BinanceServerTime>(
      `${testnetBaseUrl}/time`,
    );
    serverTime = timeResponse.data.serverTime;
    console.log(`Получено время сервера Binance: ${serverTime}`);
  } catch (error) {
    console.error("Не удалось получить время с сервера Binance:", error);
    return NextResponse.json(
      { error: "Ошибка синхронизации времени с Binance" },
      { status: 500 },
    );
  }

  const binancePath = params.path.join("/");
  const method = request.method as Method;
  const searchParams = request.nextUrl.searchParams;
  let body: Record<string, unknown> = {};

  if (method === "POST" || method === "PUT" || method === "DELETE") {
    try {
      body = await request.json();
    } catch (e) {}
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

  const signature = crypto
    .sign(null, Buffer.from(queryString), apiSecret)
    .toString("base64");

  const finalUrl = `${testnetBaseUrl}/${binancePath}?${queryString}&signature=${signature}`;
  try {
    const response = await axios({
      method,
      url: finalUrl,
      headers: {
        "X-MBX-APIKEY": apiKey,
        "Content-Type": "application/json",
      },
      // data: method !== "GET" ? body : undefined,
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Ошибка API Binance:", axiosError.response?.data);
      return NextResponse.json(
        {
          error: "Ошибка при выполнении запроса к Binance API",
          details: axiosError.response?.data,
        },
        { status: axiosError.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}

export { handler as GET, handler as POST, handler as DELETE, handler as PUT };
