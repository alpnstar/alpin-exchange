import React, { FC, useLayoutEffect, useRef } from "react";
import { useGetTradesQuery } from "@/entities/trades";
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

interface TradesTableRowProps {
  price: string;
  quantity: string;
  time: number;
  side: "buy" | "sell";
}

export const TradesTableRow: React.FC<TradesTableRowProps> = ({
  price,
  quantity,
  time,
  side,
}) => {
  return (
    <li className={`relative flex py-1 text-right text-xs`}>
      <span
        className={cn(
          "z-10 flex-grow basis-0 text-left",
          side === "buy" ? "text-buy" : "text-sell",
        )}
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

export const Trades: FC<{
  className?: string;
  symbol: string[];
}> = ({ className, symbol }) => {
  const { isLoading, isError } = useGetTradesQuery({ symbol: symbol.join("") });
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
      className={cn("bg-bg flex grow basis-0 flex-col rounded-md", className)}
    >
      <Tabs className="flex grow basis-0 flex-col" defaultValue="Market Trades">
        <TabsList className="mb-1 hidden gap-4 px-4 md:flex">
          <TabsTrigger value={"Market Trades"}>Market Trades</TabsTrigger>
          <TabsTrigger value={"My Trades"}>My Trades</TabsTrigger>
        </TabsList>
        <TabsContent
          className="flex grow basis-0 flex-col"
          value={"Market Trades"}
        >
          <div className="flex px-4 py-1 text-xs text-gray-500">
            <span className="flex-grow basis-0 text-left">
              Price ({symbol[1]})
            </span>
            <span className="flex-grow basis-0 text-right">
              Amount ({symbol[0]})
            </span>
            <span className="flex-grow basis-0 text-right">Time</span>
          </div>
          <div
            ref={listRef}
            className="custom-scrollbar grow basis-0 overflow-y-scroll pr-2.5 pl-4"
          >
            <ul>
              {isLoading ? <div>Loading...</div> : isError ? <div>Error</div> : trades.map((item) => (
                <TradesTableRow
                  key={item.a}
                  price={item.p}
                  time={item.T}
                  quantity={item.q}
                  side={!item.m ? "buy" : "sell"}
                />
              ))}

            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
