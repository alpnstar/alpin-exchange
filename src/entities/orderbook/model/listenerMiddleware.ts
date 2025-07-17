import {createListenerMiddleware} from '@reduxjs/toolkit';
import {orderbookApi} from './orderbookApi';
import {handleOrderbookUpdate} from './orderbookSlice';
import {AppDispatch, RootState} from '@/app/providers/StoreProvider/config/types';

export const orderbookListenerMiddleware = createListenerMiddleware();

orderbookListenerMiddleware.startListening({
	actionCreator: handleOrderbookUpdate,
	effect: async (action, listenerApi) => {
		const dispatch = listenerApi.dispatch as AppDispatch;
		const state = listenerApi.getState() as RootState;
		const {symbol, U} = action.payload;
		const lastUpdateId = state.orderbook.lastUpdateId;

		if (!lastUpdateId) return;

		if (U > lastUpdateId + 1) {
			console.error('Orderbook desynchronized. Re-fetching snapshot...');
			dispatch(orderbookApi.endpoints.getOrderbook.initiate({symbol: symbol.toUpperCase()}, {forceRefetch: true}));
		}
	}
});
