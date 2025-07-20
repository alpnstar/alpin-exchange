import { NextResponse } from "next/server";

const BINANCE_API_URL = process.env.NEXT_PUBLIC_BINANCE_REST_API_URL;

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } },
) {
  const path = params.path.join("/");
  const { searchParams } = new URL(request.url);
  const url = `${BINANCE_API_URL}/${path}?${searchParams.toString()}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(errorData, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json(
      { message: "Error proxying to Binance API" },
      { status: 500 },
    );
  }
}
