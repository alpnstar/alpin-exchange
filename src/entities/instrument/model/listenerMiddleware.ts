import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit';
import {instrumentSlice} from '@/entities/instrument/model/instrumentSlice';
import {instrumentApi} from '@/entities/instrument/model/instrumentApi';
import {mapBinanceStreamToCandlestick} from '@/entities/instrument/lib/mappers';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: instrumentApi.endpoints.getCandles.matchFulfilled,
	effect: async (action, listenerApi) => {
		listenerApi.cancelActiveListeners();

		const {symbol, interval} = action.meta.arg.originalArgs;
		const wsUrl = `${process.env.NEXT_PUBLIC_BINANCE_WEBSOCKET_URL}/${symbol.toLowerCase()}@kline_${interval}`;
		
		const mySocket = new WebSocket(wsUrl);

		try {
			await new Promise((resolve, reject) => {
				listenerApi.signal.addEventListener('abort', () => reject());
				mySocket.onopen = () => resolve(undefined);
				mySocket.onerror = (event) => reject(event);
			});

			mySocket.onmessage = (event) => {
				try {
					const message = JSON.parse(event.data);

					if (message.e === 'kline') {
						const newCandleData = mapBinanceStreamToCandlestick(message.k);
						listenerApi.dispatch(instrumentSlice.actions.updateLastCandle(newCandleData));
					}
				} catch (error) {
					console.error('Failed to parse WebSocket message:', error);
				}
			};

			mySocket.onerror = (error) => {
				console.error('WebSocket Error:', error);
			};

			await new Promise<void>((resolve) => {
				listenerApi.signal.addEventListener('abort', () => resolve());
			});

		} catch (error) {
			if (error) {
				console.error('WebSocket connection failed:', error);
			}
		} finally {
			if (mySocket.readyState === WebSocket.OPEN || mySocket.readyState === WebSocket.CONNECTING) {
				mySocket.close();
			}
		}
	}
});
