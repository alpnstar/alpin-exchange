import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {OrderbookData} from './types';

export const orderbookApi = createApi({
	reducerPath: 'orderbookApi',
	baseQuery: fetchBaseQuery({baseUrl: '/api/binance/'}),
	endpoints: (builder) => ({
		getOrderbook: builder.query<OrderbookData, { symbol: string; limit?: number }>({
			query: ({symbol, limit = 100}) => `depth?symbol=${symbol}&limit=${limit}`,
		}),
	}),
});

export const { useGetOrderbookQuery } = orderbookApi;
