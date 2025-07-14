import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {instrumentApi} from './instrumentApi';
import {BinanceKline} from '@/entities/instrument/model/types';

interface InstrumentState {
	candles: BinanceKline[];
}

const initialState: InstrumentState = {
	candles: []
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
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			instrumentApi.endpoints.getCandles.matchFulfilled,
			(state, action) => {
				state.candles = action.payload;
			}
		);
	}
});

