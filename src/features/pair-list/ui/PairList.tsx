"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useGetTickersQuery } from "@/entities/tickers/model/tickersApi";
import { useAppSelector } from "@/shared/lib/hooks/useRedux";
import { SearchBar } from "@/features/coin-search";
import { useLazySearchQuery } from "@/features/coin-search/model/searchApi";
import { SearchHistory } from "@/features/coin-search/ui/SearchHistory";
import { useSearchHistory } from "../lib/hooks/useSearchHistory";
import { PairListTableRow } from "./PairListTableRow";
import { Binance24HrTickerStatistics } from "@/entities/tickers";

export const PairList = () => {
  const allTickers = useAppSelector((state) => state.tickers.tickers);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isLoading, isError } = useGetTickersQuery();
  const [
    searchQueryFn,
    { data: searchResult, isLoading: searchLoading, isError: searchError },
  ] = useLazySearchQuery();

  const { addToHistory } = useSearchHistory();

  useEffect(() => {
    if (searchQuery) searchQueryFn(searchQuery);
  }, [searchQuery, searchQueryFn]);

  const displayTickers = useMemo(() => {
    return searchQuery ? searchResult || [] : allTickers || [];
  }, [searchQuery, searchResult, allTickers]);

  return (
    <div className="bg-bg relative block overflow-hidden rounded-md">
      <div>
        <div className="px-4 py-3">
          <SearchBar
            className="z-30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="sm"
            isFocused={isFocused}
            setIsFocused={setIsFocused}
          />
          <SearchHistory isVisible={!searchQuery && isFocused} />
        </div>
        {isLoading || searchLoading ? (
          <div>Loading...</div>
        ) : isError || searchError ? (
          <div>Error loading data</div>
        ) : (
          <>
            <div className="flex px-4 py-2 text-xs text-gray-500">
              <span className="flex-grow basis-0 text-left">Pair</span>
              <span className="flex-grow basis-0 text-right">Last Price</span>
              <span className="flex-grow basis-0 text-right">24h Chg</span>
            </div>
            <div
              className={`custom-scrollbar h-[296px] overflow-y-scroll pr-2.5 pl-4`}
            >
              <ul>
                {displayTickers.length ? (
                  displayTickers.map((item: Binance24HrTickerStatistics) => (
                    <PairListTableRow
                      key={item.symbol}
                      price={item.lastPrice}
                      symbol={item.symbol}
                      percent={item.priceChangePercent}
                      addToSearchHistory={addToHistory}
                    />
                  ))
                ) : (
                  <div className="mx-auto mt-[50%] w-fit translate-y-[-50%] text-center">
                    <svg
                      className=""
                      width="64"
                      height="64"
                      viewBox="0 0 96 96"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.5"
                        d="M84 28H64V8l20 20z"
                        fill="#AEB4BC"
                      ></path>
                      <path
                        opacity="0.2"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M24 8h40v20h20v60H24V8zm10 30h40v4H34v-4zm40 8H34v4h40v-4zm-40 8h40v4H34v-4z"
                        fill="#AEB4BC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22.137 64.105c7.828 5.781 18.916 5.127 26.005-1.963 7.81-7.81 7.81-20.474 0-28.284-7.81-7.81-20.474-7.81-28.284 0-7.09 7.09-7.744 18.177-1.964 26.005l-14.3 14.3 4.243 4.243 14.3-14.3zM43.9 57.9c-5.467 5.468-14.331 5.468-19.799 0-5.467-5.467-5.467-14.331 0-19.799 5.468-5.467 14.332-5.467 19.8 0 5.467 5.468 5.467 14.332 0 19.8z"
                        fill="#AEB4BC"
                      ></path>
                    </svg>
                    <div className="text-SecondaryText mt-[10px] text-[14px] font-[500]">
                      No Data
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
