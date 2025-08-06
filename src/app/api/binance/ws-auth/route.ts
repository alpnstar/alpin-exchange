import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const apiPrivateKey = process.env.BINANCE_SECRET_KEY;
const apiPublicKey = process.env.NEXT_PUBLIC_BINANCE_API_KEY;

export async function POST(request: NextRequest) {
  if (!apiPrivateKey) {
    return NextResponse.json(
      {
        error:
          "Ed25519 private key is not configured. Please set NEXT_PUBLIC_BINANCE_SECRET_KEY in your environment variables.",
      },
      { status: 500 },
    );
  }
  try {
    // const body = request.body ? await request.json() : {};
    const params = {};
    const serverTime = await fetch(
      `${process.env.NEXT_PUBLIC_BINANCE_REST_API_URL}/time`,
    ).then((res) => res.json());
    const queryString = new URLSearchParams({
      apiKey: apiPublicKey as string,
      timestamp: serverTime.serverTime.toString(),
    }).toString();

    const signature = crypto
      .sign(null, Buffer.from(queryString), apiPrivateKey)
      .toString("base64");
    return NextResponse.json({ signature, timestamp: serverTime.serverTime });
  } catch (error) {
    console.error(
      "WebSocket auth signature error:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      {
        error: "Failed to generate WebSocket auth signature.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
