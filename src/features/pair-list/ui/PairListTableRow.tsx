import React from "react";
import Link from "next/link";
import { formatNumberWithCommas } from "@/shared/lib/formatters";

export const PairListTableRow: React.FC<{
  price: string;
  symbol: string;
  percent: string;
  addToSearchHistory: (symbol: string) => void;
}> = ({ price, symbol, percent, addToSearchHistory }) => {
  return (
    <li
      className={`hover:bg-bg3 relative text-right text-xs transition-colors duration-100 hover:cursor-pointer`}
      onClick={() => addToSearchHistory(symbol)}
    >
      <Link href={`/src/app/(with-layout)/trade/${symbol}`} className="flex py-1">
        <span className={`z-10 flex-grow basis-0 text-left`}>{symbol}</span>
        <span className="z-10 flex-grow basis-0 text-right">
          {formatNumberWithCommas(+price)}
        </span>
        <span
          className={`z-10 flex-grow basis-0 text-right ${
            Math.sign(+percent) === 1 ? "text-buy" : "text-sell"
          }`}
        >
          {percent}%
        </span>
      </Link>
    </li>
  );
};
