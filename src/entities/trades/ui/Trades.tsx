import React, { FC, useLayoutEffect, useRef } from "react";
import { useGetTradesQuery } from "@/entities/trades/model/tradesApi";
import { useAppSelector } from "@/shared/lib/hooks/useRedux";
import {
  formatNumberWithCommas,
  formatTimestampToHHMMSS,
} from "@/shared/lib/formatters";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/tabs/Tabs";
import { cn } from "@/shared/lib/cn";

export const TradesTableRow: React.FC<any> = ({
  price,
  quantity,
  time,
  type = "bids",
}) => {
  return (
    <li className={`relative flex p-1 text-right text-xs`}>
      <span
        className={`z-10 flex-grow basis-0 text-left ${type === "bids" ? "text-buy" : "text-sell"}`}
      >
        {formatNumberWithCommas(+price)}
      </span>
      <span className="z-10 flex-grow basis-0 text-right">
        {formatNumberWithCommas(+quantity)}
      </span>
      <span className="z-10 flex-grow basis-0 text-right">
        {formatTimestampToHHMMSS(time)}
      </span>
    </li>
  );
};

export const Trades: FC<{ className?: string; listHeight?: string }> = ({
  className,
  listHeight = "282px",
}) => {
  const { isLoading, isError } = useGetTradesQuery({ symbol: "BTCUSDT" });
  const trades = useAppSelector((state) => state.trades.data);

  const listRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef<number>(0);

  useLayoutEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.scrollTop = scrollPos.current;
    }
  }, [trades]);

  useLayoutEffect(() => {
    const listElement = listRef.current;
    if (!listElement) {
      return;
    }

    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      scrollPos.current = target.scrollTop;
    };

    listElement.addEventListener("scroll", handleScroll);

    return () => {
      listElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "bg-bg flex grow basis-0 flex-col rounded-md px-4",
        className,
      )}
    >
      <Tabs className="flex grow basis-0 flex-col" defaultValue="Market Trades">
        <TabsList className="mb-1 hidden gap-4 md:flex">
          <TabsTrigger value={"Market Trades"}>Market Trades</TabsTrigger>
          <TabsTrigger value={"My Trades"}>My Trades</TabsTrigger>
        </TabsList>
        <TabsContent
          className="flex grow basis-0 flex-col"
          value={"Market Trades"}
        >
          <div className="flex p-1 text-xs text-gray-500">
            <span className="flex-grow basis-0 text-left">Price (USDT)</span>
            <span className="flex-grow basis-0 text-right">Amount (BTC)</span>
            <span className="flex-grow basis-0 text-right">Time</span>
          </div>
          <div ref={listRef} className="grow basis-0 overflow-y-scroll">
            <ul>
              {trades.map((item) => (
                <TradesTableRow
                  key={item.a}
                  price={item.p}
                  time={item.T}
                  quantity={item.q}
                  type={item.m ? "asks" : "bids"}
                />
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
