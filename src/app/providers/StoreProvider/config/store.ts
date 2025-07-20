import { configureStore } from "@reduxjs/toolkit";
import { instrumentApi } from "@/entities/instrument/model/instrumentApi";
import { instrumentSlice } from "@/entities/instrument/model/instrumentSlice";
import { listenerMiddleware as instrumentListenerMiddleware } from "@/entities/instrument/model/listenerMiddleware";
import {
  orderbookApi,
  orderbookSlice,
  orderbookListenerMiddleware,
} from "@/entities/orderbook";
import { tradesSlice } from "@/entities/trades/model/tradesSlice";
import { tradesApi } from "@/entities/trades/model/tradesApi";

export const store = configureStore({
  reducer: {
    [instrumentApi.reducerPath]: instrumentApi.reducer,
    [orderbookApi.reducerPath]: orderbookApi.reducer,
    [tradesApi.reducerPath]: tradesApi.reducer,
    trades: tradesSlice.reducer,
    instrument: instrumentSlice.reducer,
    orderbook: orderbookSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(instrumentApi.middleware)
      .concat(orderbookApi.middleware)
      .concat(tradesApi.middleware)
      .prepend(instrumentListenerMiddleware.middleware)
      .prepend(orderbookListenerMiddleware.middleware),
});
