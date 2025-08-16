import { createApi } from "@reduxjs/toolkit/query/react";
import { UserOrder } from "./types";
import {
  UserAccountInfoUpdate,
  UserSocket,
  UserSocketEvent,
} from "@/entities/user";
import { privateApiBaseQuery } from "@/shared/api/private-base-query";
import { RootState } from "@/app/providers/StoreProvider";
import { updateOpenOrdersByEvent } from "@/entities/orders";

export const userOrdersApi = createApi({
  reducerPath: "userOrdersApi",
  baseQuery: privateApiBaseQuery,
  endpoints: (builder) => ({
    closeOrder: builder.mutation<any, { symbol: string; clientOrderId: string }>({
      query: ({ clientOrderId, symbol }) => ({
        url: `order?symbol=${symbol}&origClientOrderId=${clientOrderId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    closeAllOrders: builder.mutation<any, { symbol: string }>({
      query: ({ symbol }) => ({
        url: `openOrders?symbol=${symbol.toUpperCase()}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getOpenOrders: builder.query<UserOrder[], { symbol?: string }>({
      query: ({ symbol }) =>
        symbol ? `openOrders?symbol=${symbol.toUpperCase()}` : "openOrders",
      async onCacheEntryAdded(
        { symbol },
        { cacheDataLoaded, cacheEntryRemoved, dispatch, getState },
      ) {
        try {
          await cacheDataLoaded;
          const state = getState() as RootState;
          const { publicKey, secretKey } = state.user;
          if (publicKey !== null && secretKey !== null) {
            const ws = UserSocket.getInstance(publicKey, secretKey);
            const handler = (data: { event: UserAccountInfoUpdate }) => {
              dispatch(updateOpenOrdersByEvent(data));
            };
            ws.connect();
            ws.on(UserSocketEvent.EXECUTION_REPORT, handler);
            await cacheEntryRemoved;
            ws.off(UserSocketEvent.EXECUTION_REPORT, handler);
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useLazyGetOpenOrdersQuery, useCloseAllOrdersMutation, useCloseOrderMutation } =
  userOrdersApi;
