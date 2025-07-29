import { configureStore } from "@reduxjs/toolkit";
import { instrumentApi } from "@/entities/instrument/model/instrumentApi";
import { instrumentSlice } from "@/entities/instrument/model/instrumentSlice";
import { tradesSlice } from "@/entities/trades/model/tradesSlice";
import { tradesApi } from "@/entities/trades/model/tradesApi";
import {
  ordersApi,
  ordersListenerMiddleware,
  ordersSlice,
} from "@/entities/orders";
import { instrumentlistenerMiddleware } from "@/entities/instrument";
import { tickersApi } from "@/entities/tickers/model/tickersApi";
import { tickersSlice } from "@/entities/tickers/model/tickersSlice";
import { searchApi } from "@/features/coin-search/model/searchApi";

export const store = configureStore({
  reducer: {
    [instrumentApi.reducerPath]: instrumentApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [tradesApi.reducerPath]: tradesApi.reducer,
    [tickersApi.reducerPath]: tickersApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    trades: tradesSlice.reducer,
    instrument: instrumentSlice.reducer,
    orders: ordersSlice.reducer,
    tickers: tickersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(instrumentApi.middleware)
      .concat(ordersApi.middleware)
      .concat(tradesApi.middleware)
      .concat(tickersApi.middleware)
      .concat(searchApi.middleware)
      .prepend(instrumentlistenerMiddleware.middleware)
      .prepend(ordersListenerMiddleware.middleware),
});
