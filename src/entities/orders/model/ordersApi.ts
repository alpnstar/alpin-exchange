import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderbookData, OrderbookUpdate } from "./types";
import { binanceWebSocket } from "@/shared/api/binanceWebSocket";
import { handleOrdersUpdate } from "@/entities/orders";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/binance/" }),
  endpoints: (builder) => ({
    getOrders: builder.query<OrderbookData, { symbol: string; limit?: number }>(
      {
        query: ({ symbol, limit = 100 }) =>
          `depth?symbol=${symbol}&limit=${limit}`,
        async onCacheEntryAdded(
          { symbol },
          { cacheDataLoaded, cacheEntryRemoved, dispatch },
        ) {
          try {
            await cacheDataLoaded;

            const streamName = `${symbol.toLowerCase()}@depth`;

            binanceWebSocket.connect();
            binanceWebSocket.subscribe(
              "depthUpdate",
              streamName,
              (data: OrderbookUpdate) => {
                dispatch(handleOrdersUpdate({ ...data, symbol }));
              },
            );

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

export const { useGetOrdersQuery } = ordersApi;
