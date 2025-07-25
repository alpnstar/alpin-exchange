import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { binanceWebSocket } from "@/shared/api/binanceWebSocket";
import {
  Binance24HrTickerStatistics,
  Binance24HrTickerStatisticsStream,
} from "@/entities/tickers/model/types";
import {
  setTickerByStream,
  updateTickers,
} from "@/entities/tickers/model/tickersSlice";

export const tickersApi = createApi({
  reducerPath: "tickersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/binance/" }),
  endpoints: (builder) => ({
    getTicker: builder.query<Binance24HrTickerStatistics, { symbol: string }>({
      query: ({ symbol }) => `ticker/24hr?symbol=${symbol}`,
      async onCacheEntryAdded(
        { symbol },
        { cacheDataLoaded, cacheEntryRemoved, dispatch },
      ) {
        try {
          await cacheDataLoaded;
          const streamName = `${symbol.toLowerCase()}@ticker`;

          binanceWebSocket.connect();
          binanceWebSocket.subscribe(
            "24hrTicker",
            streamName,
            (data: Binance24HrTickerStatisticsStream) => {
              dispatch(setTickerByStream(data));
            },
          );

          await cacheEntryRemoved;

          binanceWebSocket.unsubscribe(streamName);
        } catch (e) {
          console.error("Failed to handle trades subscription", e);
        }
      },
    }),
    getTickers: builder.query<Binance24HrTickerStatistics[], void>({
      query: () => `/tickers?symbol=USDT&limit=100&sort=alphabet`,
    }),
  }),
});

export const { useGetTickerQuery, useGetTickersQuery } = tickersApi;
