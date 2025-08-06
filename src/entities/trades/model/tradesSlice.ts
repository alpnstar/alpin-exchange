import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AggTrade, AggTradeStream } from "@/entities/trades";
import { tradesApi } from "@/entities/trades";
import { mapAggTradeStreamToAggTrade } from "@/entities/trades";

interface TradesState {
  data: AggTrade[];
}

const initialState: TradesState = {
  data: [],
};

export const tradesSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    handleTradesUpdate: (state, action: PayloadAction<AggTradeStream>) => {
      const trade = action.payload;
      state.data = [mapAggTradeStreamToAggTrade(trade), ...state.data]
        .slice(0, 100)
        .sort((a, b) => b.T - a.T);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      tradesApi.endpoints.getTrades.matchFulfilled,
      (state, action: PayloadAction<AggTrade[]>) => {
        state.data = [...action.payload];
      },
    );
  },
});
export const { handleTradesUpdate } = tradesSlice.actions;
