import { UserOrder, WsExecutionReport } from "@/entities/orders";

export function mapExecReportToOpenOrder(er: WsExecutionReport): UserOrder {
  return {
    symbol: er.s,
    orderId: er.i,
    clientOrderId: er.c,
    price: er.p,
    origQty: er.q,
    executedQty: er.z,
    cummulativeQuoteQty: er.Z,
    status: er.X,
    timeInForce: er.f,
    type: er.o,
    side: er.S,
    stopPrice: er.P,
    origQuoteOrderQty: "0.00000000",
    icebergQty: er.F,
    orderListId: er.g,
    time: er.T,
    updateTime: er.W || er.T,
    isWorking: er.w,
    workingTime: er.W,
    selfTradePreventionMode: er.V,
  };
}
