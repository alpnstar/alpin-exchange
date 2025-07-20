"use client";
import React from "react";

export const OrderbookTableHeader = () => {
  return (
    <div className="flex p-1 text-xs text-gray-500">
      <span className="flex-grow basis-0 text-left">Price (USDT)</span>
      <span className="flex-grow basis-0 text-right">Amount (BTC)</span>
      <span className="flex-grow basis-0 text-right">Total</span>
    </div>
  );
};
