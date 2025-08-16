import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/providers/StoreProvider";

export const privateApiBaseQuery = fetchBaseQuery({
  baseUrl: "/api/binance/private",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const { publicKey, secretKey } = state.user;

    if (publicKey && secretKey) {
      headers.set("X-API-KEY", publicKey);
      headers.set("X-SECRET-KEY", secretKey);
    }
    return headers;
  },
});
