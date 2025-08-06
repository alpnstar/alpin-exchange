/**
 * @description
 * Представляет собой данные одной свечи (Kline/Candlestick), как они приходят от REST API Binance.
 * Это кортеж (массив с фиксированным порядком и типами элементов).
 *
 * @see https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data
 *
 * @example
 * [
 *   1499040000000,      // 0: Open time (Время открытия)
 *   "0.01634790",       // 1: Open (Цена открытия)
 *   "0.80000000",       // 2: High (Максимальная цена)
 *   "0.01575800",       // 3: Low (Минимальная цена)
 *   "0.01577100",       // 4: Close (Цена закрытия)
 *   "148976.11427815",  // 5: Volume (Объем в базовом активе)
 *   1499644799999,      // 6: Close time (Время закрытия)
 *   "2434.19055334",    // 7: Quote asset volume (Объем в котируемом активе)
 *   308,                // 8: Number of trades (Количество сделок)
 *   "1756.87402397",    // 9: Taker buy base asset volume (Объем тейкер-покупок в базовом активе)
 *   "28.46694368",      // 10: Taker buy quote asset volume (Объем тейкер-покупок в котируемом активе)
 *   "17928899.62484339" // 11: Ignore (Игнорируется)
 * ]
 */
export type BinanceKline = [
  number, // 0: Open time
  string, // 1: Open
  string, // 2: High
  string, // 3: Low
  string, // 4: Close
  string, // 5: Volume
  number, // 6: Close time
  string, // 7: Quote asset volume
  number, // 8: Number of trades
  string, // 9: Taker buy base asset volume
  string, // 10: Taker buy quote asset volume
  string, // 11: Ignore
];

/**
 * @interface BinanceStreamKline
 * @description Представляет собой данные одной свечи из WebSocket потока.
 * @see https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-streams
 */
export interface BinanceStreamKline {
  /**
   * @property {number} t - Время начала свечи (timestamp).
   */
  t: number; // Kline start time
  /**
   * @property {number} T - Время окончания свечи (timestamp).
   */
  T: number; // Kline close time
  /**
   * @property {string} s - Символ (торговая пара).
   */
  s: string; // Symbol
  /**
   * @property {string} i - Интервал свечи (e.g., "1m", "5m").
   */
  i: string; // Interval
  /**
   * @property {string} o - Цена открытия.
   */
  o: string; // Open price
  /**
   * @property {string} c - Цена закрытия.
   */
  c: string; // Close price
  /**
   * @property {string} h - Максимальная цена.
   */
  h: string; // High price
  /**
   * @property {string} l - Минимальная цена.
   */
  l: string; // Low price
  /**
   * @property {boolean} x - Является ли эта свеча закрытой.
   */
  x: boolean; // Is this kline closed?
}

