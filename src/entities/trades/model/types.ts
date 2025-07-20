export interface AggTrade {
  a: number; // Aggregate tradeId
  p: string; // Price
  q: string; // Quantity
  f: number; // First tradeId
  l: number; // Last tradeId
  T: number; // Timestamp
  m: boolean; // Was the buyer the maker?
  M: boolean; // Was the trade the best price match?
}

export interface AggTradeStream {
  /**
   * Тип события (например, "aggTrade")
   * @example "aggTrade"
   */
  e: string;

  /**
   * Время события в миллисекундах (timestamp)
   * @example 1672515782136
   */
  E: number;

  /**
   * Торговая пара (символ)
   * @example "BNBBTC"
   */
  s: string;

  /**
   * ID агрегированной сделки
   * @example 12345
   */
  a: number;

  /**
   * Цена в виде строки
   * @example "0.001"
   */
  p: string;

  /**
   * Количество в виде строки
   * @example "100"
   */
  q: string;

  /**
   * ID первой сделки в агрегации
   * @example 100
   */
  f: number;

  /**
   * ID последней сделки в агрегации
   * @example 105
   */
  l: number;

  /**
   * Время совершения сделки в миллисекундах (timestamp)
   * @example 1672515782136
   */
  T: number;

  /**
   * Является ли покупатель маркет-мейкером?
   * @example true
   */
  m: boolean;

  /**
   * Поле, которое следует игнорировать (согласно документации)
   * @example true
   */
  M: boolean;
}
