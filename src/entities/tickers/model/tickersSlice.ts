import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Binance24HrTickerStatistics,
  Binance24HrTickerStatisticsStream,
} from "@/entities/tickers/model/types";
import { tickersApi } from "@/entities/tickers";
import { mapBinanceStreamTo24HrTickerStatistics } from "@/entities/instrument";

interface TickersState {
  tickers: Binance24HrTickerStatistics[];
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
        state.tickers = action.payload;
      },
    );
  },
});

export const { setTickerByStream, updateTickers } = tickersSlice.actions;
