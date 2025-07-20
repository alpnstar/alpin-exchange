import React, { FC } from "react";
import { useGetTickerQuery } from "@/entities/instrument/model/instrumentApi";
import { useAppSelector } from "@/shared/lib/hooks/useRedux";
import { formatNumberWithCommas } from "@/shared/lib/formatters";
import { usePrevious } from "@/shared/lib/hooks/usePrevious";

interface TickerStatProps {
  label: string;
  value: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

const TickerStat: FC<TickerStatProps> = ({
  label,
  value,
  className,
  valueClassName,
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <span className="text-textThird">{label}</span>
    <span className={valueClassName}>{value}</span>
  </div>
);

export const Ticker: FC = () => {
  const { isLoading, isError } = useGetTickerQuery({ symbol: "BTCUSDT" });
  const data = useAppSelector((state) => state.instrument.ticker);
  const prevLastPrice = usePrevious(data?.lastPrice);

  const lastPriceColor =
    data && prevLastPrice && prevLastPrice >= data.lastPrice
      ? "text-sell"
      : "text-buy";
  const priceChangeColor =
    data && Math.sign(+data.priceChange) === -1 ? "text-sell" : "text-buy";

  const formattedPriceChange =
    data &&
    formatNumberWithCommas(Number(data.priceChange)) +
      " " +
      data.priceChangePercent +
      "%";

  return (
    <div className="bg-bg col-start-1 flex items-center rounded-md px-3 py-2 md:col-end-[-1] lg:col-end-3">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}
      {data && (
        <div className="flex w-full items-center justify-between gap-4 p-1 text-[10px] md:justify-start md:text-[12px]">
          <div className="flex flex-col md:flex-row">
            <div>
              <h1 className="text-[20px] font-medium md:text-xl">
                {data.symbol}
              </h1>
            </div>
            <div className={`text-[28px] md:ml-5 md:text-xl ${lastPriceColor}`}>
              {formatNumberWithCommas(Number(data.lastPrice))}
            </div>
            <div>
              <div
                className={`text-xl text-[12px] md:hidden ${priceChangeColor}`}
              >
                {Number(data.priceChangePercent).toFixed(2) + "%"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:flex">
            <TickerStat
              label="24h Change"
              value={formattedPriceChange}
              className="hidden md:flex"
              valueClassName={priceChangeColor}
            />
            <TickerStat
              label="24h High"
              value={formatNumberWithCommas(Number(data.highPrice))}
            />
            <TickerStat
              label="24h Low"
              value={formatNumberWithCommas(Number(data.lowPrice))}
            />
            <TickerStat
              label="24h Volume(BTC)"
              value={formatNumberWithCommas(Number(data.volume))}
            />
            <TickerStat
              label="24h Volume(USDT)"
              value={formatNumberWithCommas(Number(data.quoteVolume))}
            />
          </div>
        </div>
      )}
    </div>
  );
};
