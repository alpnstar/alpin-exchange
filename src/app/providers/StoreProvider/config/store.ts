import { configureStore } from "@reduxjs/toolkit";
import { instrumentApi } from "@/entities/instrument";
import { instrumentSlice } from "@/entities/instrument";
import { tradesSlice } from "@/entities/trades";
import { tradesApi } from "@/entities/trades";
import { orderbookApi } from "@/entities/orders";
import { orderbookSlice } from "@/entities/orders";
import { ordersListener } from "@/entities/orders";
import { instrumentlistener } from "@/entities/instrument";
import { tickersApi } from "@/entities/tickers";
import { tickersSlice } from "@/entities/tickers";
import { searchApi } from "@/features/coin-search/model/searchApi";
import { userOrdersApi } from "@/entities/orders";
import { makeOrderApi } from "@/features/make-order/model/makeOrderApi";
import { userOrdersSlice } from "@/entities/orders";
import { userApi, userSlice } from "@/entities/user";

export const store = configureStore({
  reducer: {
    [instrumentApi.reducerPath]: instrumentApi.reducer,
    [orderbookApi.reducerPath]: orderbookApi.reducer,
    [tradesApi.reducerPath]: tradesApi.reducer,
    [tickersApi.reducerPath]: tickersApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [makeOrderApi.reducerPath]: makeOrderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userOrdersApi.reducerPath]: userOrdersApi.reducer,
    trades: tradesSlice.reducer,
    instrument: instrumentSlice.reducer,
    orderbook: orderbookSlice.reducer,
    tickers: tickersSlice.reducer,
    user: userSlice.reducer,
    userOrders: userOrdersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(instrumentApi.middleware)
      .concat(orderbookApi.middleware)
      .concat(tradesApi.middleware)
      .concat(tickersApi.middleware)
      .concat(searchApi.middleware)
      .concat(makeOrderApi.middleware)
      .concat(userApi.middleware)
      .concat(userOrdersApi.middleware)
      .prepend(instrumentlistener.middleware)
      .prepend(ordersListener.middleware),
});
