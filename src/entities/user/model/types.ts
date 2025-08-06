/**
 * @interface Balance
 * @description Информация о балансе актива пользователя.
 */
export interface Balance {
  /**
   * @property {string} asset - Название актива (e.g., "BTC", "USDT").
   */
  asset: string;
  /**
   * @property {string} free - Доступное количество актива.
   */
  free: string;
  /**
   * @property {string} locked - Заблокированное количество актива (в открытых ордерах).
   */
  locked: string;
}

/**
 * @interface UserAccountInfo
 * @description Полная информация об аккаунте пользователя.
 */
export interface UserAccountInfo {
  /**
   * @property {number} makerCommission - Комиссия мейкера (в базисных пунктах, e.g. 15 -> 0.15%).
   */
  makerCommission: number;
  /**
   * @property {number} takerCommission - Комиссия тейкера (в базисных пунктах).
   */
  takerCommission: number;
  /**
   * @property {number} buyerCommission - Комиссия покупателя (в базисных пунктах).
   */
  buyerCommission: number;
  /**
   * @property {number} sellerCommission - Комиссия продавца (в базисных пунктах).
   */
  sellerCommission: number;
  /**
   * @property {boolean} canTrade - Разрешена ли торговля для аккаунта.
   */
  canTrade: boolean;
  /**
   * @property {boolean} canWithdraw - Разрешен ли вывод средств.
   */
  canWithdraw: boolean;
  /**
   * @property {boolean} canDeposit - Разрешен ли ввод средств.
   */
  canDeposit: boolean;
  /**
   * @property {boolean} brokered - Является ли аккаунт брокерским.
   */
  brokered: boolean;
  /**
   * @property {boolean} requireSelfTradePrevention - Требуется ли предотвращение самоторговли.
   */
  requireSelfTradePrevention: boolean;
  /**
   * @property {boolean} preventSor - Предотвращать ли SOR (Smart Order Routing).
   */
  preventSor: boolean;
  /**
   * @property {number} updateTime - Время последнего обновления информации об аккаунте (timestamp).
   */
  updateTime: number;
  /**
   * @property {string} accountType - Тип аккаунта (e.g., "SPOT").
   */
  accountType: string;
  /**
   * @property {Balance[]} balances - Массив объектов баланса для каждого актива.
   */
  balances: Balance[];
  /**
   * @property {string[]} permissions - Список разрешений аккаунта (e.g., ["SPOT"]).
   */
  permissions: string[];
  /**
   * @property {number} uid - Уникальный идентификатор пользователя.
   */
  uid: number;
}

/**
 * @interface UserAccountInfoUpdate
 * @description Обновление информации о балансе аккаунта из WebSocket (событие outboundAccountPosition).
 */
export interface UserAccountInfoUpdate {
  /**
   * @property {string} e - Тип события ("outboundAccountPosition").
   */
  e: "outboundAccountPosition";
  /**
   * @property {number} E - Время события (timestamp).
   */
  E: number;
  /**
   * @property {number} u - Время последнего обновления аккаунта (timestamp).
   */
  u: number;
  /**
   * @property {StreamBalance[]} B - Массив обновленных балансов.
   */
  B: StreamBalance[];
}

/**
 * @interface StreamBalance
 * @description Информация о балансе актива в потоке данных WebSocket.
 */
export interface StreamBalance {
  /**
   * @property {string} a - Название актива.
   */
  a: string;
  /**
   * @property {string} f - Доступный баланс.
   */
  f: string;
  /**
   * @property {string} l - Заблокированный баланс.
   */
  l: string;
}