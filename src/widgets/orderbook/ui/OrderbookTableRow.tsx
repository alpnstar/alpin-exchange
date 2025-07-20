"use client";
import React from "react";
import { formatNumberWithCommas } from "@/shared/lib/formatters";

interface OrderbookRowProps {
  price: string;
  quantity: string;
  type: "bids" | "asks";
}

export const OrderbookTableRow: React.FC<OrderbookRowProps> = ({
  price,
  quantity,
  type,
}) => {
  const total = parseFloat(price) * parseFloat(quantity);
  const rowColor = type === "bids" ? "bg-buy/[.10]" : "bg-sell/[.10]";
  return (
    <li className={`relative ${rowColor} flex p-1 text-xs`}>
      <div
        className={`bg-bg absolute top-0 left-0 h-full`}
        style={{ width: `${100 - Math.min((total / 100000) * 100, 100)}%` }}
      ></div>
      <span
        className={`z-10 flex-grow basis-0 text-left ${type === "bids" ? "text-buy" : "text-sell"}`}
      >
        {formatNumberWithCommas(+price)}
      </span>
      <span className="z-10 flex-grow basis-0 text-right">
        {formatNumberWithCommas(+quantity)}
      </span>
      <span className="z-10 flex-grow basis-0 text-right">
        {formatNumberWithCommas(+total, { decimals: 2 })}
      </span>
    </li>
  );
};
