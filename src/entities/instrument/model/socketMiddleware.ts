import {createListenerMiddleware} from '@reduxjs/toolkit';
import {instrumentSlice} from '@/entities/instrument/model/instrumentSlice';
import {instrumentApi} from '@/entities/instrument/model/instrumentApi';
import {mapBinanceStreamToCandlestick} from '@/entities/instrument/lib/mappers';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: instrumentApi.endpoints.getCandles.matchFulfilled,


	effect: async (action, listenerApi) => {
		const {symbol, interval} = action.meta.arg.originalArgs;

		const socket = new WebSocket(`${process.env.NEXT_PUBLIC_BINANCE_WEBSOCKET_URL}/${symbol.toLowerCase()}@kline_${interval}`);

		const task = listenerApi.fork(async () => {
			await new Promise((resolve, reject) => {
				socket.onmessage = (event) => {
					const message = JSON.parse(event.data);

					if (message.e === 'kline') {
						const newCandleData = mapBinanceStreamToCandlestick(message.k);

						listenerApi.dispatch(instrumentSlice.actions.updateLastCandle(newCandleData));
					}
				};
				socket.onclose = resolve;
				socket.onerror = reject;
			});
		});

		await listenerApi.condition(() => {
			return false;
		});

		socket.close();
		task.cancel();
	}
});