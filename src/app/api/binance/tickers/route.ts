import { NextResponse } from "next/server";
import { getCachedTickers } from "@/shared/api/tickersCache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filterSymbol = searchParams.get("symbol")?.toUpperCase();
  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : undefined;

  try {
    const data = await getCachedTickers();

    let filtered = filterSymbol
      ? data.filter(
          (item) => item.symbol.endsWith(filterSymbol) /*&&
        parseFloat(item.priceChangePercent) !== 0,*/,
        )
      : data;

    filtered = filtered.sort(
      (a, b) => parseFloat(b.volume) - parseFloat(a.volume),
    );
    if (limit) filtered = filtered.slice(0, limit);

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
