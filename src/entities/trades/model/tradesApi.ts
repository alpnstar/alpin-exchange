import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { binanceWebSocket } from "@/shared/api/binanceWebSocket";
import { AggTrade, AggTradeStream } from "@/entities/trades";
import { handleTradesUpdate } from "@/entities/trades";

export const tradesApi = createApi({
  reducerPath: "tradesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/binance/public" }),
  endpoints: (builder) => ({
    getTrades: builder.query<AggTrade[], { symbol: string; limit?: number }>({
      query: ({ symbol, limit = 100 }) =>
        `aggTrades?symbol=${symbol}&limit=${limit}`,
      keepUnusedDataFor: 0,
      async onCacheEntryAdded(
        { symbol },
        { cacheDataLoaded, cacheEntryRemoved, dispatch },
      ) {
        try {
          await cacheDataLoaded;
          const streamName = `${symbol.toLowerCase()}@aggTrade`;

          binanceWebSocket.connect();
          binanceWebSocket.subscribe(streamName, (data: AggTradeStream) => {
            dispatch(handleTradesUpdate(data));
          });

          await cacheEntryRemoved;

          binanceWebSocket.unsubscribe(streamName);
        } catch (e) {
          console.error("Failed to handle trades subscription", e);
        }
      },
    }),
  }),
});

export const { useGetTradesQuery } = tradesApi;
