import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {instrumentApi} from './instrumentApi';
import {Binance24HrTickerStatistics, BinanceKline} from '@/entities/instrument/model/types';

interface InstrumentState {
	candles: BinanceKline[];
	ticker: Binance24HrTickerStatistics | null;
}

const initialState: InstrumentState = {
	candles: [],
	ticker: null,
};

export const instrumentSlice = createSlice({
	name: 'instrument',
	initialState,
	reducers: {

		updateLastCandle: (state, action: PayloadAction<BinanceKline>) => {
			const newCandle = action.payload;
			const lastCandle = state.candles[state.candles.length - 1];

			if (lastCandle && lastCandle[0] === newCandle[0]) {
				state.candles[state.candles.length - 1] = newCandle;
			} else {
				state.candles.push(newCandle);
			}
		},
		setTicker: (state, action: PayloadAction<Binance24HrTickerStatistics>) => {
			state.ticker = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			instrumentApi.endpoints.getCandles.matchFulfilled,
			(state, action) => {
				state.candles = action.payload;
			}
		);
		builder.addMatcher(
			instrumentApi.endpoints.getTicker.matchFulfilled,
			(state, action) => {
				state.ticker = action.payload;
			}
		);
	}
});

