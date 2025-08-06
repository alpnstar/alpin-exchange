/**
 * @interface AggTrade
 * @description Представляет собой агрегированную сделку. Агрегированная сделка — это одна или несколько отдельных сделок,
 * которые произошли по одной и той же цене и в одном и том же направлении (покупка/продажа).
 * Эта структура данных возвращается REST API.
 */
export interface AggTrade {
  /**
   * @property {number} a - ID агрегированной сделки.
   */
  a: number;
  /**
   * @property {string} p - Цена, по которой прошла сделка.
   */
  p: string;
  /**
   * @property {string} q - Количество актива, которое было продано.
   */
  q: string;
  /**
   * @property {number} f - ID первой сделки, включенной в эту агрегацию.
   */
  f: number;
  /**
   * @property {number} l - ID последней сделки, включенной в эту агрегацию.
   */
  l: number;
  /**
   * @property {number} T - Временная метка (timestamp) сделки в миллисекундах.
   */
  T: number;
  /**
   * @property {boolean} m - Указывает, был ли покупатель маркет-мейкером.
   * `true` - покупатель был мейкером, `false` - тейкером.
   */
  m: boolean;
  /**
   * @property {boolean} M - Указывает, была ли сделка по лучшей цене. (Согласно документации Binance, это поле можно игнорировать).
   */
  M: boolean;
}

/**
 * @interface AggTradeStream
 * @description Представляет собой событие агрегированной сделки, полученное через WebSocket.
 * Содержит всю информацию из `AggTrade`, а также метаданные самого события.
 */
export interface AggTradeStream {
  /**
   * @property {string} e - Тип события.
   * @example "aggTrade"
   */
  e: string;

  /**
   * @property {number} E - Временная метка (timestamp) события в миллисекундах.
   * @example 1672515782136
   */
  E: number;

  /**
   * @property {string} s - Символ (торговая пара).
   * @example "BNBBTC"
   */
  s: string;

  /**
   * @property {number} a - ID агрегированной сделки.
   * @example 12345
   */
  a: number;

  /**
   * @property {string} p - Цена сделки.
   * @example "0.001"
   */
  p: string;

  /**
   * @property {string} q - Количество в сделке.
   * @example "100"
   */
  q: string;

  /**
   * @property {number} f - ID первой сделки в агрегации.
   * @example 100
   */
  f: number;

  /**
   * @property {number} l - ID последней сделки в агрегации.
   * @example 105
   */
  l: number;

  /**
   * @property {number} T - Временная метка (timestamp) исполнения сделки в миллисекундах.
   * @example 1672515782136
   */
  T: number;

  /**
   * @property {boolean} m - Указывает, был ли покупатель маркет-мейкером.
   * @example true
   */
  m: boolean;

  /**
   * @property {boolean} M - Указывает, была ли сделка по лучшей цене (можно игнорировать).
   * @example true
   */
  M: boolean;
}