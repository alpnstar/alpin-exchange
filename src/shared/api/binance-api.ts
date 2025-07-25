export async function validateSymbolOnServer(symbol: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BINANCE_REST_API_URL}/exchangeInfo?symbol=${symbol.toUpperCase()}`,
      { cache: "no-store" },
    );
    if (!response.ok) return false;
    const data = await response.json();
    return data.symbols && data.symbols.length > 0;
  } catch (error) {
    console.error("Server-side validation error:", error);
    return false;
  }
}
