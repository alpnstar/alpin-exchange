import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {OrderbookData, OrderbookUpdate} from './types';
import {binanceWebSocket} from '@/shared/api/binanceWebSocket';
import {handleOrderbookUpdate} from '@/entities/orderbook/model/orderbookSlice';

export const orderbookApi = createApi({
	reducerPath: 'orderbookApi',
	baseQuery: fetchBaseQuery({baseUrl: '/api/binance/'}),
	endpoints: (builder) => ({
		getOrderbook: builder.query<OrderbookData, { symbol: string; limit?: number }>({
			query: ({symbol, limit = 100}) => `depth?symbol=${symbol}&limit=${limit}`,
			keepUnusedDataFor: 0,
			async onCacheEntryAdded(
				{ symbol },
				{ cacheDataLoaded, cacheEntryRemoved, dispatch }
			) {
				try {
					await cacheDataLoaded;

					const streamName = `${symbol.toLowerCase()}@depth`;

					binanceWebSocket.connect();
					binanceWebSocket.subscribe({}, streamName, (data: OrderbookUpdate) => {
						dispatch(handleOrderbookUpdate({ ...data, symbol }));
					});

					await cacheEntryRemoved;

					binanceWebSocket.unsubscribe(streamName);

				} catch (e) {
					console.error('Failed to handle orderbook subscription', e)
				}
			}
		}),
	}),
});

export const { useGetOrderbookQuery } = orderbookApi;
