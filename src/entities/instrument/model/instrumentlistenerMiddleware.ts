import { createListenerMiddleware } from "@reduxjs/toolkit";
import { instrumentSlice } from "@/entities/instrument/model/instrumentSlice";
import { instrumentApi } from "@/entities/instrument/model/instrumentApi";
import {
  mapBinanceStreamKlineToBinanceKline,
  mapBinanceStreamTo24HrTickerStatistics,
} from "@/entities/instrument/lib/mappers";
import { binanceWebSocket } from "@/shared/api/binanceWebSocket";

export const instrumentlistenerMiddleware = createListenerMiddleware();

instrumentlistenerMiddleware.startListening({
  matcher: instrumentApi.endpoints.getCandles.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    const { symbol, interval } = action.meta.arg.originalArgs;
    const wsUrl = `${symbol.toLowerCase()}@kline_${interval}`;
    binanceWebSocket.connect();
    binanceWebSocket.subscribe( wsUrl, (data) => {
      const newCandleData = mapBinanceStreamKlineToBinanceKline(data.k);
      listenerApi.dispatch(
        instrumentSlice.actions.updateLastCandle(newCandleData),
      );
    });
    await new Promise<void>(() => {
      listenerApi.signal.addEventListener("abort", () =>
        binanceWebSocket.unsubscribe(wsUrl),
      );
    });
  },
});
