import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BinanceKline} from '@/entities/instrument/model/types';


export const instrumentApi = createApi({
	reducerPath: 'instrumentApi',
	baseQuery: fetchBaseQuery({baseUrl: '/api/binance/'}),
	tagTypes: [],
	endpoints: (builder) => ({
		getCandles: builder.query<BinanceKline[], { symbol: string; interval: string }>({
			query: ({symbol, interval}) => ({
				url: `klines?symbol=${symbol}&interval=${interval}`,
				headers: {}
			}),
			keepUnusedDataFor: 0
		})

	})
});

export const {
	useGetCandlesQuery
} = instrumentApi;