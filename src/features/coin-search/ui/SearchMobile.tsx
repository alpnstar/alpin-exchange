import React, { FC, useEffect, useState } from "react";
import { InputLink } from "@/features/coin-search/ui/InputLink";
import { SideBar } from "@/shared/ui/sidebar";
import { SearchBar } from "@/features/coin-search";
import { useLazySearchQuery } from "@/features/coin-search/model/searchApi";
import Link from "next/link";

export const SearchMobile: FC<{
  burger: boolean;
  setBurger: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ burger, setBurger }) => {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [searchFn, { data }] = useLazySearchQuery();

  useEffect(() => {
    if (query) {
    }
    searchFn(query);
  }, [query, searchFn]);

  return (
    <SideBar
      className="overflow-y-scroll"
      sizeVariant="secondary"
      trigger={
        <div>
          <InputLink mobile={true} />
        </div>
      }
      title={""}
      open={open}
      setOpen={setOpen}
    >
      <div>
        <SearchBar
          cancelVariant="persistent"
          inputValue={query}
          setInputValue={setQuery}
          onCancelClick={() => setOpen(false)}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />
      </div>
      <div className="mt-4 flex flex-col gap-2 text-[12px]">
        {data &&
          query &&
          data.map((coin) => (
            <Link
              onClick={() => {
                setOpen(false);
                setBurger(false);
              }}
              href={`/src/app/(with-layout)/trade/${coin.symbol}`}
              key={coin.symbol}
            >
              <div
                className="flex items-center justify-between px-4 py-3"
                key={coin.symbol}
              >
                <span className="font-medium">{coin.symbol}</span>
                <div className="flex flex-col items-end gap-1">
                  <span>{coin.lastPrice}</span>
                  <span
                    className={`${Math.sign(+coin.priceChangePercent) === 1 ? "text-buy" : "text-sell"} text-[10px]`}
                  >
                    {coin.priceChangePercent}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </SideBar>
  );
};
