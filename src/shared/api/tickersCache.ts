import { Binance24HrTickerStatistics } from "@/entities/tickers";

const CACHE_TTL = 50000;

interface CachedTickers {
  timestamp: number;
  data: Binance24HrTickerStatistics[];
  fetchPromise: Promise<Binance24HrTickerStatistics[]> | null;
}

const cache: CachedTickers = {
  timestamp: 0,
  data: [],
  fetchPromise: null,
};

export async function getCachedTickers(): Promise<
  Binance24HrTickerStatistics[]
> {
  const now = Date.now();

  if (now - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }

  if (cache.fetchPromise) {
    return cache.fetchPromise;
  }

  cache.fetchPromise = fetch(
    `${process.env.NEXT_PUBLIC_BINANCE_REST_API_URL}/ticker/24hr`,
  )
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to fetch tickers from Binance API:", errorData);
        if (cache.data.length > 0) {
          return cache.data;
        }
        throw new Error("Failed to fetch tickers");
      }
      return res.json();
    })
    .then((data: Binance24HrTickerStatistics[]) => {
      cache.data = data;
      cache.timestamp = Date.now();
      cache.fetchPromise = null;
      return data;
    })
    .catch((error) => {
      console.error("Error in getCachedTickers:", error);
      cache.fetchPromise = null;
      if (cache.data.length > 0) {
        return cache.data;
      }
      throw error;
    });

  return cache.fetchPromise;
}
