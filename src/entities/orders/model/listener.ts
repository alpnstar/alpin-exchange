import { createListenerMiddleware } from "@reduxjs/toolkit";
import { orderbookApi } from "./orderbookApi";
import {
  AppDispatch,
  RootState,
} from "@/app/providers/StoreProvider/config/types";
import { handleOrderbookUpdate } from "./orderbookSlice";

export const ordersListener = createListenerMiddleware();

ordersListener.startListening({
  actionCreator: handleOrderbookUpdate,
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch as AppDispatch;
    const state = listenerApi.getState() as RootState;
    const { symbol, U } = action.payload;
    const lastUpdateId = state.orderbook.lastUpdateId;

    if (!lastUpdateId) return;

    if (U > lastUpdateId + 1) {
      console.error("Orderbook desynchronized. Re-fetching snapshot...");
      dispatch(
        orderbookApi.endpoints.getOrders.initiate(
          { symbol: symbol.toUpperCase() },
          { forceRefetch: true },
        ),
      );
    }
  },
});
