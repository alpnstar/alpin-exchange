// Тип данных, как он приходит от Binance API
export type BinanceKline = [
	number, // Open time
	string, // Open
	string, // High
	string, // Low
	string, // Close
	string, // Volume
	number, // Close time
	string, // Quote asset volume
	number, // Number of trades
	string, // Taker buy base asset volume
	string, // Taker buy quote asset volume
	string  // Ignore
];

export interface BinanceStreamKline {
	t: number; // Kline start time
	T: number; // Kline close time
	s: string; // Symbol
	i: string; // Interval
	o: string; // Open price
	c: string; // Close price
	h: string; // High price
	l: string; // Low price
	x: boolean; // Is this kline closed?
}

