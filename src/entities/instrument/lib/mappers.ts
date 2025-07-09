import {BinanceKline, BinanceStreamKline} from '../model/types';
import {AreaData, CandlestickData, Time} from 'lightweight-charts';

export function mapBinanceKlineToCandlestick(
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
export const mapBinanceStreamToCandlestick = (streamData: BinanceStreamKline): CandlestickData => ({
	time: streamData.t / 1000 as Time,
	open: parseFloat(streamData.o),
	high: parseFloat(streamData.h),
	low: parseFloat(streamData.l),
	close: parseFloat(streamData.c),
});
