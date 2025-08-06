import { AggTrade, AggTradeStream } from "@/entities/trades";

/**
 * @name mapAggTradeStreamToAggTrade
 * @description Преобразует объект AggTradeStream (из WebSocket) в объект AggTrade (как в REST API).
 * Это может быть полезно для унификации данных, полученных из разных источников.
 *
 * @param aggTradeStream - Объект AggTradeStream из WebSocket.
 * @returns Объект AggTrade, содержащий только основные данные о сделке.
 */
export const mapAggTradeStreamToAggTrade = (
  aggTradeStream: AggTradeStream,
): AggTrade => {
  const { e, E, s, ...rest } = aggTradeStream;
  return rest;
};
