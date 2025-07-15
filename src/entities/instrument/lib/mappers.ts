import {
	Binance24HrTickerStatistics,
	Binance24HrTickerStatisticsStream,
	BinanceKline,
	BinanceStreamKline
} from '../model/types';
import {AreaData, CandlestickData, Time} from 'lightweight-charts';

export function mapBinanceKlineToCandlestickData(
	kline: BinanceKline
): CandlestickData {
	return {
		time: kline[0] / 1000 as Time, // Переводим миллисекунды в секунды
		open: parseFloat(kline[1]),
		high: parseFloat(kline[2]),
		low: parseFloat(kline[3]),
		close: parseFloat(kline[4]),
	};
}

export function mapBinanceKlineToAreaData(
	kline: BinanceKline
): AreaData {
	return {
		time: kline[0] / 1000 as Time,       // Время то же самое - timestamp в секундах
		value: parseFloat(kline[4]), // Используем цену закрытия (Close) как основное значение
	};
}
export const mapBinanceStreamKlineToCandlestickData = (streamData: BinanceStreamKline): CandlestickData => ({
	time: streamData.t / 1000 as Time,
	open: parseFloat(streamData.o),
	high: parseFloat(streamData.h),
	low: parseFloat(streamData.l),
	close: parseFloat(streamData.c),
});


export const mapBinanceStreamKlineToBinanceKline = (streamKline: BinanceStreamKline): BinanceKline => {
	return [
		streamKline.t,      // Open time
		streamKline.o,      // Open
		streamKline.h,      // High
		streamKline.l,      // Low
		streamKline.c,      // Close
		'',                 // Volume - нет в стриме, оставляем пустым
		streamKline.T,      // Close time
		'',                 // Quote asset volume - нет в стриме
		0,                  // Number of trades - нет в стриме, ставим 0
		'',                 // Taker buy base asset volume - нет в стриме
		'',                 // Taker buy quote asset volume - нет в стриме
		''                  // Ignore
	];
};

export const mapBinanceStreamTo24HrTickerStatistics = (
    streamData: Binance24HrTickerStatisticsStream
): Binance24HrTickerStatistics => {
    return {
        symbol: streamData.s,
        priceChange: streamData.p,
        priceChangePercent: streamData.P,
        weightedAvgPrice: streamData.w,
        prevClosePrice: streamData.x,
        lastPrice: streamData.c,
        lastQty: streamData.Q,
        bidPrice: streamData.b,
        bidQty: streamData.B,
        askPrice: streamData.a,
        askQty: streamData.A,
        openPrice: streamData.o,
        highPrice: streamData.h,
        lowPrice: streamData.l,
        volume: streamData.v,
        quoteVolume: streamData.q,
        openTime: streamData.O,
        closeTime: streamData.C,
        firstId: streamData.F,
        lastId: streamData.L,
        count: streamData.n,
    };
};
