import React, { FC, useEffect } from "react";
import { useCloseAllOrdersMutation, useLazyGetOpenOrdersQuery } from "@/entities/orders";
import { useAppSelector } from "@/shared/lib";

interface IOpenOrdersProps {
  symbol: string[];
}

export const OpenOrders: FC<IOpenOrdersProps> = ({ symbol }) => {
  const user = useAppSelector(state => state.user);
  const [getOpenOrders] = useLazyGetOpenOrdersQuery();
  const openOrders = useAppSelector(state => state.userOrders.openOrders);
const [closeAllOrders] = useCloseAllOrdersMutation();

  useEffect(() => {
    if (user.secretKey && user.publicKey) {
      getOpenOrders({ symbol: symbol.join("") });
    }
  }, [user.secretKey, user.publicKey, getOpenOrders, symbol]);

  const formatNumber = (value: string | number, decimals = 8) => {
    return parseFloat(value as string).toFixed(decimals).replace(/\.?0+$/, "");
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="text-TertiaryText w-full text-[12px]">
      {/* Header */}
      <div className="flex w-full font-bold border-b border-gray-700 pb-1 mb-1">
        <div className="grow-1 basis-[88px]">Дата</div>
        <div className="grow-1 basis-[120px]">Пара</div>
        <div className="grow-1 basis-[110px]">Тип</div>
        <div className="grow-1 basis-[60px]">Сторона</div>
        <div className="grow-1 basis-[120px]">Цена</div>
        <div className="grow-1 basis-[120px]">Количество</div>
        <div className="grow-1 basis-[100px]">Айсберг</div>
        <div className="grow-1 basis-[60px]">Заполнено</div>
        <div className="grow-1 basis-[80px]">Всего</div>
        <div className="grow-1 basis-[100px]">Условия активации</div>
        <div className="grow-1 basis-[48px]">SOR</div>
        <div className="grow-1 basis-[48px]">TP/SL</div>
        <div onClick={() => closeAllOrders({ symbol: symbol.join("") })} className="grow-1 basis-[100px] text-PrimaryYellow cursor-pointer">Отменить все</div>
      </div>

      {/* Data */}
      {openOrders.length > 0 ? (
        openOrders.map(item => {
          const filledPercent =
            (parseFloat(item.executedQty) / parseFloat(item.origQty)) * 100;
          const total =
            parseFloat(item.price) * parseFloat(item.origQty);

          return (
            <div
              key={item.orderId}
              className="flex w-full border-b border-gray-800 py-1"
            >
              <div className="grow-1 basis-[88px]">
                {formatDate(item.time)}
              </div>
              <div className="grow-1 basis-[120px]">{item.symbol}</div>
              <div className="grow-1 basis-[110px]">{item.type}</div>
              <div
                className={`grow-1 basis-[60px] font-bold ${
                  item.side === "BUY" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.side}
              </div>
              <div className="grow-1 basis-[120px]">
                {formatNumber(item.price)}
              </div>
              <div className="grow-1 basis-[120px]">
                {formatNumber(item.origQty)}
              </div>
              <div className="grow-1 basis-[100px]">
                {item.icebergQty && item.icebergQty !== "0"
                  ? formatNumber(item.icebergQty)
                  : "-"}
              </div>
              <div className="grow-1 basis-[60px]">
                {formatNumber(item.executedQty)}{" "}
                <span className="text-gray-400">
                  ({filledPercent.toFixed(2)}%)
                </span>
              </div>
              <div className="grow-1 basis-[80px]">
                {formatNumber(total)}
              </div>
              <div className="grow-1 basis-[100px]">
                {item.stopPrice && item.stopPrice !== "0"
                  ? formatNumber(item.stopPrice)
                  : "-"}
              </div>
              <div className="grow-1 basis-[48px]">-</div>
              <div className="grow-1 basis-[48px]">-</div>
              <div className="grow-1 basis-[100px]">
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  X
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500 py-4">Нет открытых ордеров</div>
      )}
    </div>
  );
};
