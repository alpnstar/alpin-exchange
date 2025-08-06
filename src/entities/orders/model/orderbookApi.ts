import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderbookData, OrderbookUpdate } from "./types";
import { binanceWebSocket } from "@/shared/api";
import { handleOrderbookUpdate } from "@/entities/orders";

export const orderbookApi = createApi({
  reducerPath: "orderbookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/binance/public" }),
  endpoints: (builder) => ({
    getOrders: builder.query<OrderbookData, { symbol: string; limit?: number }>(
      {
        query: ({ symbol, limit = 100 }) =>
          `depth?symbol=${symbol}&limit=${limit}`,
        keepUnusedDataFor: 0,
        async onCacheEntryAdded(
          { symbol },
          { cacheDataLoaded, cacheEntryRemoved, dispatch },
        ) {
          try {
            await cacheDataLoaded;

            const streamName = `${symbol.toLowerCase()}@depth`;

            binanceWebSocket.connect();
            binanceWebSocket.subscribe(streamName, (data: OrderbookUpdate) => {
              dispatch(handleOrderbookUpdate({ ...data, symbol }));
            });

            await cacheEntryRemoved;

            binanceWebSocket.unsubscribe(streamName);
          } catch (e) {
            console.error("Failed to handle orders subscription", e);
          }
        },
      },
    ),
  }),
});

export const { useGetOrdersQuery } = orderbookApi;
