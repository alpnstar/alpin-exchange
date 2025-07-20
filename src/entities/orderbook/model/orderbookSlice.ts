import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderbookData, OrderbookUpdate } from "./types";
import { orderbookApi } from "./orderbookApi";

interface OrderbookState {
  data: OrderbookData | null;
  lastUpdateId: number | null;
}

const initialState: OrderbookState = {
  data: null,
  lastUpdateId: null,
};

const updateOrderbook = (
  currentBids: [string, string][],
  currentAsks: [string, string][],
  updates: { b: [string, string][]; a: [string, string][] },
) => {
  const update = (list: [string, string][], updates: [string, string][]) => {
    const map = new Map(list);
    updates.forEach(([price, quantity]) => {
      if (parseFloat(quantity) === 0) {
        map.delete(price);
      } else {
        map.set(price, quantity);
      }
    });
    return Array.from(map.entries());
  };

  const newBids = update(currentBids, updates.b).sort(
    (a, b) => parseFloat(b[0]) - parseFloat(a[0]),
  );
  const newAsks = update(currentAsks, updates.a).sort(
    (a, b) => parseFloat(a[0]) - parseFloat(b[0]),
  );

  return { newBids, newAsks };
};

export const orderbookSlice = createSlice({
  name: "orderbook",
  initialState,
  reducers: {
    resetOrderbookState: (state) => {
      state.data = null;
      state.lastUpdateId = null;
    },
    handleOrderbookUpdate: (
      state,
      action: PayloadAction<{ symbol: string } & OrderbookUpdate>,
    ) => {
      if (!state.data || !state.lastUpdateId) return;

      const update = action.payload;

      if (
        update.U <= state.lastUpdateId + 1 &&
        update.u >= state.lastUpdateId + 1
      ) {
        const { newBids, newAsks } = updateOrderbook(
          state.data.bids,
          state.data.asks,
          { b: update.b, a: update.a },
        );
        state.data.bids = newBids;
        state.data.asks = newAsks;
        state.lastUpdateId = update.u;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      orderbookApi.endpoints.getOrderbook.matchFulfilled,
      (state, action: PayloadAction<OrderbookData>) => {
        state.data = action.payload;
        state.lastUpdateId = action.payload.lastUpdateId;
      },
    );
  },
});

export const { handleOrderbookUpdate, resetOrderbookState } =
  orderbookSlice.actions;
