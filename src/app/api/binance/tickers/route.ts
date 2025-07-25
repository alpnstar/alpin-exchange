import { NextResponse } from "next/server";
import { Binance24HrTickerStatistics } from "@/entities/tickers/model/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filterSymbol = searchParams.get("symbol")?.toUpperCase() || "USDT";
  const limit = parseInt(searchParams.get("limit") || "100", 10);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BINANCE_REST_API_URL}/ticker/24hr`,
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(errorData, { status: res.status });
    }

    const data: Binance24HrTickerStatistics[] = await res.json();

    let filtered = data.filter(
      (item) =>
        item.symbol.endsWith(filterSymbol) &&
        parseFloat(item.priceChangePercent) !== 0,
    );

    filtered = filtered.sort(
      (a, b) => parseFloat(b.volume) - parseFloat(a.volume),
    );
    filtered = filtered.slice(0, limit);

    filtered = filtered.sort((a, b) => a.symbol.localeCompare(b.symbol));

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("Filtered tickers error:", error);
    return NextResponse.json(
      { message: "Error fetching filtered tickers" },
      { status: 500 },
    );
  }
}
