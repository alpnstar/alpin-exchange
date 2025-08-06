/**
 * @interface OrderbookData
 * @description Представляет собой снимок книги ордеров (стакана).
 * Эта структура данных возвращается REST API при первоначальной загрузке.
 */
export type OrderbookData = {
  /**
   * @property {number} lastUpdateId - ID последнего обновления, включенного в этот снимок.
   * Используется для синхронизации с WebSocket потоком.
   */
  lastUpdateId: number;
  /**
   * @property {[string, string][]} bids - Массив ордеров на покупку (биды).
   * Каждый элемент - это кортеж `[цена, количество]`.
   */
  bids: [string, string][];
  /**
   * @property {[string, string][]} asks - Массив ордеров на продажу (аски).
   * Каждый элемент - это кортеж `[цена, количество]`.
   */
  asks: [string, string][];
};

/**
 * @interface OrderbookUpdate
 * @description Представляет собой обновление данных книги ордеров из WebSocket потока.
 */
export type OrderbookUpdate = {
  /**
   * @property {string} e - Тип события (e.g., "depthUpdate").
   */
  e: string; // Event type
  /**
   * @property {number} E - Время события (timestamp).
   */
  E: number; // Event time
  /**
   * @property {string} s - Символ (торговая пара).
   */
  s: string; // Symbol
  /**
   * @property {number} U - ID первого обновления в событии.
   */
  U: number; // First update ID in event
  /**
   * @property {number} u - ID последнего обновления в событии.
   */
  u: number; // Final update ID in event
  /**
   * @property {[string, string][]} b - Массив ордеров на покупку (биды) для обновления.
   */
  b: [string, string][]; // Bids to be updated
  /**
   * @property {[string, string][]} a - Массив ордеров на продажу (аски) для обновления.
   */
  a: [string, string][]; // Asks to be updated
};

/**
 * @interface UserOrder
 * @description Представляет собой один открытый ордер пользователя.
 * Эта структура данных возвращается приватными эндпоинтами REST API.
 */
export interface UserOrder {
  /**
   * @property {string} symbol - Торговая пара.
   */
  symbol: string;
  /**
   * @property {number} orderId - Уникальный идентификатор ордера.
   */
  orderId: number;
  /**
   * @property {number} orderListId - ID списка ордеров (для OCO ордеров), иначе -1.
   */
  orderListId: number; // or -1
  /**
   * @property {string} clientOrderId - Пользовательский ID ордера.
   */
  clientOrderId: string;
  /**
   * @property {string} price - Цена, по которой был размещен ордер.
   */
  price: string;
  /**
   * @property {string} origQty - Изначальное количество в ордере.
   */
  origQty: string;
  /**
   * @property {string} executedQty - Количество, которое уже исполнено.
   */
  executedQty: string;
  /**
   * @property {string} cummulativeQuoteQty - Суммарное количество в котируемой валюте, которое было исполнено.
   */
  cummulativeQuoteQty: string;
  /**
   * @property {string} status - Текущий статус ордера (e.g., 'NEW', 'PARTIALLY_FILLED', 'FILLED').
   */
  status: string; // e.g., 'NEW', 'PARTIALLY_FILLED'
  /**
   * @property {string} timeInForce - Условие времени действия ордера (e.g., 'GTC', 'IOC', 'FOK').
   */
  timeInForce: string;
  /**
   * @property {string} type - Тип ордера (e.g., 'LIMIT', 'MARKET').
   */
  type: string; // e.g., 'LIMIT', 'MARKET'
  /**
   * @property {"BUY" | "SELL"} side - Сторона ордера (покупка или продажа).
   */
  side: "BUY" | "SELL";
  /**
   * @property {string} stopPrice - Цена, при которой сработает стоп-ордер.
   */
  stopPrice: string;
  /**
   * @property {string} icebergQty - Количество для "айсберг" ордера.
   */
  icebergQty: string;
  /**
   * @property {number} time - Время создания ордера (timestamp).
   */
  time: number;
  /**
   * @property {number} updateTime - Время последнего обновления ордера (timestamp).
   */
  updateTime: number;
  /**
   * @property {boolean} isWorking - Находится ли ордер в данный момент в книге ордеров.
   */
  isWorking: boolean;
  /**
   * @property {string} origQuoteOrderQty - Изначальное количество в котируемой валюте.
   */
  origQuoteOrderQty: string;
}
