import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Binance24HrTickerStatistics,
  Binance24HrTickerStatisticsStream,
} from "@/entities/tickers/model/types";
import { tickersApi } from "@/entities/tickers/model/tickersApi";
import { mapBinanceStreamTo24HrTickerStatistics } from "@/entities/instrument/lib/mappers";

interface TickersState {
  tickers: any;
  ticker: Binance24HrTickerStatistics | null;
}

const initialState: TickersState = {
  tickers: [],
  ticker: null,
};

export const tickersSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {
    setTickerByStream: (
      state,
      action: PayloadAction<Binance24HrTickerStatisticsStream>,
    ) => {
      state.ticker = mapBinanceStreamTo24HrTickerStatistics(action.payload);
    },
    updateTickers: (
      state,
      action: PayloadAction<Binance24HrTickerStatisticsStream[]>,
    ) => {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      tickersApi.endpoints.getTicker.matchFulfilled,
      (state, action) => {
        state.ticker = action.payload;
      },
    );
    builder.addMatcher(
      tickersApi.endpoints.getTickers.matchFulfilled,
      (state, action) => {
        state.tickers = action.payload
          .filter((t) => +t.priceChangePercent !== 0)
          .slice(0, 500);
      },
    );
  },
});

export const { setTickerByStream, updateTickers } = tickersSlice.actions;
