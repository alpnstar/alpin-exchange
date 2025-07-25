"use client";
import React from "react";
import { useGetTickersQuery } from "@/entities/tickers/model/tickersApi";
import { useAppSelector } from "@/shared/lib/hooks/useRedux";
import { formatNumberWithCommas } from "@/shared/lib/formatters";

export const PairListTableRow: React.FC<any> = ({ price, symbol, percent }) => {
  return (
    <li className={`relative flex p-1 text-right text-xs`}>
      <span className={`z-10 flex-grow basis-0 text-left`}>{symbol}</span>
      <span className="z-10 flex-grow basis-0 text-right">
        {formatNumberWithCommas(+price)}
      </span>
      <span
        className={`z-10 flex-grow basis-0 text-right ${Math.sign(+percent) === 1 ? "text-buy" : "text-sell"}`}
      >
        {percent}%
      </span>
    </li>
  );
};

export const PairList = () => {
  const { isLoading, isError } = useGetTickersQuery();
  const tickers = useAppSelector((state) => state.tickers.tickers);
  return (
    <div className="bg-bg hidden rounded-md p-2 lg:block">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading data</div>
      ) : (
        <>
          <div className="flex p-1 text-xs text-gray-500">
            <span className="flex-grow basis-0 text-left">Pair</span>
            <span className="flex-grow basis-0 text-right">Last Price</span>
            <span className="flex-grow basis-0 text-right">24h Chg</span>
          </div>
          <div className={`h-[296px] overflow-y-scroll`}>
            <ul>
              {tickers.map((item) => (
                <PairListTableRow
                  key={item.symbol}
                  price={item.lastPrice}
                  symbol={item.symbol}
                  percent={item.priceChangePercent}
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
