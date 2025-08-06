/**
 * @interface Binance24HrTickerStatistics
 * @description Статистика по тикеру за 24 часа.
 * Эта структура данных возвращается REST API.
 */
export type Binance24HrTickerStatistics = {
  /**
   * @property {string} symbol - Название торговой пары (e.g., "BTCUSDT").
   */
  symbol: string;
  /**
   * @property {string} priceChange - Изменение цены за 24 часа.
   */
  priceChange: string;
  /**
   * @property {string} priceChangePercent - Процентное изменение цены за 24 часа.
   */
  priceChangePercent: string;
  /**
   * @property {string} weightedAvgPrice - Средневзвешенная цена.
   */
  weightedAvgPrice: string;
  /**
   * @property {string} prevClosePrice - Цена предыдущего закрытия.
   */
  prevClosePrice: string;
  /**
   * @property {string} lastPrice - Последняя цена.
   */
  lastPrice: string;
  /**
   * @property {string} lastQty - Количество в последней сделке.
   */
  lastQty: string;
  /**
   * @property {string} bidPrice - Лучшая цена покупки (бид).
   */
  bidPrice: string;
  /**
   * @property {string} bidQty - Количество по лучшей цене покупки.
   */
  bidQty: string;
  /**
   * @property {string} askPrice - Лучшая цена продажи (аск).
   */
  askPrice: string;
  /**
   * @property {string} askQty - Количество по лучшей цене продажи.
   */
  askQty: string;
  /**
   * @property {string} openPrice - Цена открытия.
   */
  openPrice: string;
  /**
   * @property {string} highPrice - Максимальная цена за 24 часа.
   */
  highPrice: string;
  /**
   * @property {string} lowPrice - Минимальная цена за 24 часа.
   */
  lowPrice: string;
  /**
   * @property {string} volume - Объем торгов в базовой валюте.
   */
  volume: string;
  /**
   * @property {string} quoteVolume - Объем торгов в котируемой валюте.
   */
  quoteVolume: string;
  /**
   * @property {number} openTime - Время открытия периода (timestamp).
   */
  openTime: number;
  /**
   * @property {number} closeTime - Время закрытия периода (timestamp).
   */
  closeTime: number;
  /**
   * @property {number} firstId - ID первой сделки в периоде.
   */
  firstId: number;
  /**
   * @property {number} lastId - ID последней сделки в периоде.
   */
  lastId: number;
  /**
   * @property {number} count - Количество сделок в периоде.
   */
  count: number;
};

/**
 * @interface Binance24HrTickerStatisticsStream
 * @description Поток данных статистики по тикеру за 24 часа из WebSocket.
 */
export type Binance24HrTickerStatisticsStream = {
  /**
   * @property {"24hrTicker"} e - Тип события.
   */
  e: "24hrTicker"; // Event type
  /**
   * @property {number} E - Время события (timestamp).
   */
  E: number; // Event time
  /**
   * @property {string} s - Название торговой пары.
   */
  s: string; // Symbol
  /**
   * @property {string} p - Изменение цены.
   */
  p: string; // Price change
  /**
   * @property {string} P - Процентное изменение цены.
   */
  P: string; // Price change percent
  /**
   * @property {string} w - Средневзвешенная цена.
   */
  w: string; // Weighted average price
  /**
   * @property {string} x - Цена закрытия предыдущего дня.
   */
  x: string; // First trade(F)-1 price (first trade before the 24hr rolling window)
  /**
   * @property {string} c - Последняя цена.
   */
  c: string; // Last price
  /**
   * @property {string} Q - Количество в последней сделке.
   */
  Q: string; // Last quantity
  /**
   * @property {string} b - Лучшая цена покупки (бид).
   */
  b: string; // Best bid price
  /**
   * @property {string} B - Количество по лучшей цене покупки.
   */
  B: string; // Best bid quantity
  /**
   * @property {string} a - Лучшая цена продажи (аск).
   */
  a: string; // Best ask price
  /**
   * @property {string} A - Количество по лучшей цене продажи.
   */
  A: string; // Best ask quantity
  /**
   * @property {string} o - Цена открытия.
   */
  o: string; // Open price
  /**
   * @property {string} h - Максимальная цена за 24 часа.
   */
  h: string; // High price
  /**
   * @property {string} l - Минимальная цена за 24 часа.
   */
  l: string; // Low price
  /**
   * @property {string} v - Объем торгов в базовой валюте.
   */
  v: string; // Total traded base asset volume
  /**
   * @property {string} q - Объем торгов в котируемой валюте.
   */
  q: string; // Total traded quote asset volume
  /**
   * @property {number} O - Время открытия периода (timestamp).
   */
  O: number; // Statistics open time
  /**
   * @property {number} C - Время закрытия периода (timestamp).
   */
  C: number; // Statistics close time
  /**
   * @property {number} F - ID первой сделки.
   */
  F: number; // First trade ID
  /**
   * @property {number} L - ID последней сделки.
   */
  L: number; // Last trade Id
  /**
   * @property {number} n - Количество сделок.
   */
  n: number; // Total number of trades
};
