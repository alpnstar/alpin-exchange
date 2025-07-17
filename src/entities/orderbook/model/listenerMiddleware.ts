import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit';
import {orderbookApi} from './orderbookApi';
import {binanceWebSocket} from '@/shared/api/binanceWebSocket';
import {handleOrderbookUpdate} from './orderbookSlice';
import {AppDispatch, RootState} from '@/app/providers/StoreProvider/config/types';
import {OrderbookUpdate} from './types';

export const orderbookListenerMiddleware = createListenerMiddleware();

orderbookListenerMiddleware.startListening({
	matcher: isAnyOf(orderbookApi.endpoints.getOrderbook.matchFulfilled),
	effect: async (action, listenerApi) => {
		const dispatch = listenerApi.dispatch as AppDispatch;
		const symbol = action.meta.arg.originalArgs.symbol;
		const streamName = `${symbol.toLowerCase()}@depth`;

		binanceWebSocket.connect();
		binanceWebSocket.subscribe({}, streamName, (data: OrderbookUpdate) => {
			const state = listenerApi.getState() as RootState;
			const lastUpdateId = state.orderbook.lastUpdateId;

			if (!lastUpdateId) {
				return;
			}

			if (data.u <= lastUpdateId) {
				return;
			}

			if (data.U > lastUpdateId + 1) {
				console.error('Orderbook desynchronized. Re-fetching snapshot...');

				binanceWebSocket.unsubscribe(streamName);


				dispatch(orderbookApi.endpoints.getOrderbook.initiate({symbol: symbol.toUpperCase()}, {forceRefetch: true}));

			} else {

				dispatch(handleOrderbookUpdate(data));
			}
		});

		await listenerApi.condition((action) => {
			return orderbookApi.endpoints.getOrderbook.matchPending(action) && action.meta.arg.originalArgs.symbol.toLowerCase() !== symbol;
		});

		binanceWebSocket.unsubscribe(streamName);
	}
});
