import { getCachedTickers } from "@/shared/api/tickersCache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  try {
    const res = await getCachedTickers();
    if(query) return NextResponse.json(res.filter((item) => item.symbol.includes(query)).slice(0, 20));
  }catch (error) {
    console.error("Filtered tickers error:", error);
    return NextResponse.json(
      { message: "Error fetching filtered tickers" },
      { status: 500 },
    );
  }
}