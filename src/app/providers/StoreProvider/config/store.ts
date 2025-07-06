import { configureStore } from '@reduxjs/toolkit';
import {cryptoApi} from '@/entities/coin/model/coinApi';

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});
