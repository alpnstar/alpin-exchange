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
 * @see https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#current-open-orders-user_data
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
  orderListId: number;
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
  status: string;
  /**
   * @property {string} timeInForce - Условие времени действия ордера (e.g., 'GTC', 'IOC', 'FOK').
   */
  timeInForce: string;
  /**
   * @property {string} type - Тип ордера (e.g., 'LIMIT', 'MARKET').
   */
  type: string;
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
   * @property {number} workingTime - Время, когда ордер был помещен в книгу ордеров (timestamp).
   */
  workingTime: number;
  /**
   * @property {string} origQuoteOrderQty - Изначальное количество в котируемой валюте.
   */
  origQuoteOrderQty: string;
  /**
   * @property {string} selfTradePreventionMode - Режим предотвращения самоторговли.
   */
  selfTradePreventionMode: string;
}

/**
 * @interface WsExecutionReport
 * @description Формат сообщения о выполнении ордера (executionReport) в User Data Stream.
 * @see https://developers.binance.com/docs/binance-spot-api-docs/user-data-stream#payload-account-update
 */
export interface WsExecutionReport {
  /**
   * @property {string} e - Тип события (e.g., "executionReport").
   */
  e: string;
  /**
   * @property {number} E - Время события (timestamp).
   */
  E: number;
  /**
   * @property {string} s - Символ (торговая пара).
   */
  s: string;
  /**
   * @property {string} c - Пользовательский ID ордера.
   */
  c: string;
  /**
   * @property {"BUY" | "SELL"} S - Сторона ордера.
   */
  S: "BUY" | "SELL";
  /**
   * @property {string} o - Тип ордера.
   */
  o: string;
  /**
   * @property {string} f - Условие времени действия ордера.
   */
  f: string;
  /**
   * @property {string} q - Изначальное количество.
   */
  q: string;
  /**
   * @property {string} p - Цена ордера.
   */
  p: string;
  /**
   * @property {string} P - Стоп-цена.
   */
  P: string;
  /**
   * @property {string} F - Количество для "айсберг" ордера.
   */
  F: string;
  /**
   * @property {number} g - ID списка ордеров (-1 если нет).
   */
  g: number;
  /**
   * @property {string | null} C - Изначальный пользовательский ID ордера (для OCO).
   */
  C: string | null;
  /**
   * @property {string} x - Тип исполнения.
   */
  x: string;
  /**
   * @property {string} X - Статус ордера.
   */
  X: string;
  /**
   * @property {string} r - Причина отклонения ордера.
   */
  r: string;
  /**
   * @property {number} i - ID ордера.
   */
  i: number;
  /**
   * @property {string} l - Количество в последней исполненной сделке.
   */
  l: string;
  /**
   * @property {string} z - Суммарное исполненное количество.
   */
  z: string;
  /**
   * @property {string} L - Цена последней исполненной сделки.
   */
  L: string;
  /**
   * @property {string} n - Сумма комиссии.
   */
  n: string;
  /**
   * @property {string | null} N - Актив, в котором взята комиссия.
   */
  N: string | null;
  /**
   * @property {number} T - Время транзакции (timestamp).
   */
  T: number;
  /**
   * @property {number} t - ID сделки.
   */
  t: number;
  /**
   * @property {number} I - Игнорируется.
   */
  I: number;
  /**
   * @property {boolean} w - Находится ли ордер в книге ордеров.
   */
  w: boolean;
  /**
   * @property {boolean} m - Является ли тейкер мейкером.
   */
  m: boolean;
  /**
   * @property {boolean} M - Игнорируется.
   */
  M: boolean;
  /**
   * @property {number} O - Время создания ордера (timestamp).
   */
  O: number;
  /**
   * @property {string} Z - Суммарное количество в котируемой валюте, которое было исполнено.
   */
  Z: string;
  /**
   * @property {string} Y - Количество в котируемой валюте в последней сделке.
   */
  Y: string;
  /**
   * @property {number} W - Время, когда ордер был помещен в книгу ордеров (timestamp).
   */
  W: number;
  /**
   * @property {string} V - Режим предотвращения самоторговли.
   */
  V: string;
}