import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Binance24HrTickerStatistics,
  BinanceKline,
} from "@/entities/instrument/model/types";

export const instrumentApi = createApi({
  reducerPath: "instrumentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/binance/" }),
  tagTypes: [],
  endpoints: (builder) => ({
    getCandles: builder.query<
      BinanceKline[],
      { symbol: string; interval: string }
    >({
      query: ({ symbol, interval }) => ({
        url: `klines?symbol=${symbol}&interval=${interval}`,
        headers: {},
      }),
      keepUnusedDataFor: 0,
    }),
    getTicker: builder.query<Binance24HrTickerStatistics, { symbol: string }>({
      query: ({ symbol }) => ({
        url: `/ticker/24hr?symbol=${symbol}`,
        headers: {},
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetCandlesQuery, useGetTickerQuery } = instrumentApi;
