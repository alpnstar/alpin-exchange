import { createListenerMiddleware } from "@reduxjs/toolkit";
import { ordersApi } from "./ordersApi";
import {
  AppDispatch,
  RootState,
} from "@/app/providers/StoreProvider/config/types";
import { handleOrdersUpdate } from "@/entities/orders/model/ordersSlice";

export const ordersListenerMiddleware = createListenerMiddleware();

ordersListenerMiddleware.startListening({
  actionCreator: handleOrdersUpdate,
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch as AppDispatch;
    const state = listenerApi.getState() as RootState;
    const { symbol, U } = action.payload;
    const lastUpdateId = state.orders.lastUpdateId;

    if (!lastUpdateId) return;

    if (U > lastUpdateId + 1) {
      console.error("Orders desynchronized. Re-fetching snapshot...");
      dispatch(
        ordersApi.endpoints.getOrders.initiate(
          { symbol: symbol.toUpperCase() },
          { forceRefetch: true },
        ),
      );
    }
  },
});
