"use client";
import React from "react";
import { useOrderbook } from "../lib/hooks";
import { OrderbookTable } from "./OrderbookTable";

export const Orderbook = ({ className }: { className?: string }) => {
  const { bids, asks, isLoading, isError } = useOrderbook("BTCUSDT");

  return (
    <div
      className={`bg-bg rounded-md p-2 lg:row-start-2 lg:row-end-4 ${className}`}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading data</div>
      ) : !!bids.length && !!asks.length ? (
        <div className="flex h-full flex-col">
          <h2 className="mb-2 text-lg font-semibold">Order Book</h2>
          <div className="flex flex-grow flex-col gap-4">
            <OrderbookTable data={asks} type="asks" />
            <OrderbookTable data={bids} type="bids" />
          </div>
        </div>
      ) : false}
    </div>
  );
};
