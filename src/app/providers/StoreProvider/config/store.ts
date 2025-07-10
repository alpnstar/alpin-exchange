import { configureStore } from '@reduxjs/toolkit';
import {instrumentApi} from '@/entities/instrument/model/instrumentApi';
import {instrumentSlice} from '@/entities/instrument/model/instrumentSlice';
import {listenerMiddleware} from '@/entities/instrument/model/listenerMiddleware';

export const store = configureStore({
  reducer: {
    [instrumentApi.reducerPath]: instrumentApi.reducer,
    instrument: instrumentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(instrumentApi.middleware).prepend(listenerMiddleware.middleware),
});
