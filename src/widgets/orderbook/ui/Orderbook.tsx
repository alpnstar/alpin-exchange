"use client";
import React from "react";
import { useOrderbook } from "../lib/hooks";
import { OrderbookTable } from "./OrderbookTable";
import { cn } from "@/shared/lib/cn";

export const Orderbook = ({
  className,
  symbol,
}: {
  className?: string;
  symbol: string[];
}) => {
  const { bids, asks, isLoading, isError } = useOrderbook(symbol.join(""));

  return (
    <div
      className={cn(
        "bg-bg h-f flex grow flex-col rounded-md p-2 lg:row-start-2 lg:row-end-4",
        className,
      )}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading data</div>
      ) : !!bids.length && !!asks.length ? (
        <div className="flex grow basis-0 flex-col">
          <h2 className="mb-2 text-lg font-semibold">Order Book</h2>
          <div className="flex flex-grow flex-col gap-4 overflow-hidden">
            <OrderbookTable data={asks} type="asks" />
            <OrderbookTable data={bids} type="bids" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
