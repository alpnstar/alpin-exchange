import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Binance24HrTickerStatistics } from "@/entities/tickers";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/binance/search" }),
  tagTypes: [],
  endpoints: (builder) => ({
    search: builder.query<Binance24HrTickerStatistics[], string>({
      query: (query) => `?query=${query.toUpperCase()}`,
    }),
  }),
});

export const { useLazySearchQuery } = searchApi;
