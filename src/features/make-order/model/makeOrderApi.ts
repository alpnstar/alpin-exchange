import { createApi } from "@reduxjs/toolkit/query/react";
import { privateApiBaseQuery } from "@/shared/api/private-base-query";

interface Order {
  symbol: string;
  quantity: string;
  side: "BUY" | "SELL";
  type:
    | "MARKET"
    | "LIMIT"
    | "STOP_LOSS"
    | "STOP_LOSS_LIMIT"
    | "TAKE_PROFIT"
    | "TAKE_PROFIT_LIMIT"
    | "LIMIT_MAKER";
}

export const makeOrderApi = createApi({
  reducerPath: "makeOrderApi",
  baseQuery: privateApiBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    makeOrder: builder.mutation<any, Order>({
      query: ({ symbol, quantity, side, type }) => {
        return {
          url: `order`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symbol: symbol.toUpperCase(),
            side,
            type: "LIMIT",
            price: 116000,
            timeInForce: "GTC",
            quantity,
          }),
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});
export const { useMakeOrderMutation } = makeOrderApi;
