"use client";

import React from "react";
import { Ticker } from "@/widgets/ticker/ui/Ticker";
import { Orderbook } from "@/widgets/orderbook";
import { TradingPanel } from "@/widgets/Trading-panel";
import { PairList } from "@/features/pair-list";
import { Trades } from "@/entities/trades";
import { useIsMobile } from "@/shared/lib/hooks/use-mobile";

export function TradePageClient({ symbol }: { symbol: string }) {
  const isMobile = useIsMobile(768);
  return (
    <div>
      <div className="wrapper mt-2">
        <div className="grid h-full flex-1 grid-cols-[1fr] grid-rows-[minmax(50px,auto)_minmax(593px,auto)_auto] gap-2 md:grid-cols-[1fr_1fr_1fr] md:grid-rows-[minmax(50px,auto)_545px_266px_300px] lg:grid-cols-[320px_1fr_320px] lg:grid-rows-[minmax(50px,auto)_600px_minmax(260px,auto)_560px]">
          <Ticker symbol={symbol} />
          {!isMobile && <Orderbook symbol={symbol} />}
          <TradingPanel symbol={symbol} />
          <div className="bg-bg hidden rounded-md p-2 md:row-start-2 md:row-end-4 md:block lg:col-start-2 lg:row-start-3 lg:row-end-auto">
            <p>Trade Form</p>
          </div>

          <div className="hidden flex-col gap-2 md:flex lg:row-start-1 lg:row-end-4">
            <PairList />
            {!isMobile && <Trades symbol={symbol} />}
            <div className="bg-bg hidden h-[150px] rounded-md p-2 lg:block">
              <p>Top Movers</p>
            </div>
          </div>

          <div className="bg-bg col-start-1 col-end-[-1] rounded-md p-2">
            <p>Open Orders / Order History</p>
          </div>
        </div>
      </div>
    </div>
  );
}
