import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {instrumentApi} from './instrumentApi';
import {mapBinanceKlineToCandlestick} from '@/entities/instrument/lib/mappers';
import {CandlestickData} from 'lightweight-charts';

interface InstrumentState {
	candles: CandlestickData[];
}

const initialState: InstrumentState = {
	candles: []
};

export const instrumentSlice = createSlice({
	name: 'instrument',
	initialState,
	reducers: {
		updateLastCandle: (state, action: PayloadAction<CandlestickData>) => {
			const newCandle = action.payload;
			const lastCandle = state.candles[state.candles.length - 1];

			if (lastCandle && lastCandle.time === newCandle.time) {
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
				state.candles = action.payload.map(mapBinanceKlineToCandlestick);
			}
		);
	}
});

