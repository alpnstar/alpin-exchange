import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserOrder } from "./types";
import { UserSocket } from "@/entities/user";

export const userOrdersApi = createApi({
  reducerPath: "userOrdersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/binance/private" }),
  tagTypes: ["UserOrders"],
  endpoints: (builder) => ({
    getOpenOrders: builder.query<UserOrder[], { symbol?: string }>({
      query: ({ symbol }) =>
        symbol ? `openOrders?symbol=${symbol.toUpperCase()}` : "openOrders",
      async onCacheEntryAdded(
        { symbol },
        { cacheDataLoaded, cacheEntryRemoved, dispatch },
      ) {
        try {
          await cacheDataLoaded;
          const ws = UserSocket.getInstance();
          ws.connect();
          ws.on("executionReport", (data: any) => {
            console.log("executionReport", data);
          });
        } catch (error) {
          console.error(error);
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ orderId }) => ({
                type: "UserOrders" as const,
                id: orderId,
              })),
              { type: "UserOrders", id: "LIST" },
            ]
          : [{ type: "UserOrders", id: "LIST" }],
    }),
  }),
});

export const { useGetOpenOrdersQuery } = userOrdersApi;
