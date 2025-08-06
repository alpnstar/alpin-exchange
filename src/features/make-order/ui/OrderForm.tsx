// Иконка стрелки для выпадающих списков
import SelectTest, { SelectItem } from "@/features/make-order/ui/SelectTest";
import * as React from "react";
import { useMemo, useState } from "react";
import { useMakeOrderMutation } from "@/features/make-order/model/makeOrderApi";
import { useGetAccountInfoQuery } from "@/entities/user/model/userApi";
import { useAppSelector } from "@/shared/lib/hooks/useRedux";

// Иконка информации
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-4 w-4 text-gray-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
);

// Компонент ползунка
const Slider = () => (
  <div className="relative flex w-full items-center py-4">
    <div className="h-0.5 w-full bg-gray-600">
      {/* Метки на ползунке */}
      <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-1.5 w-px bg-gray-600"></div>
        ))}
      </div>
    </div>
    <div className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 transform border-2 border-gray-500 bg-gray-800"></div>
  </div>
);

// Основной компонент
const OrderForm = ({ symbol }: { symbol: string[] }) => {
  const [buyValue, setBuyValue] = useState<string>(symbol[0]);
  const [buyInput, setBuyInput] = useState<string>("");
  const [sellValue, setSellValue] = useState<string>(symbol[0]);
  const [sellInput, setSellInput] = useState<string>("");

  const [makeOrder] = useMakeOrderMutation();
  const { isLoading, isError } = useGetAccountInfoQuery();
  const user = useAppSelector((state) => state.user.accountInfo);
  const ticker = useAppSelector((state) => state.tickers.ticker);
  const firstBalance = useMemo(
    () => user?.balances.find((b) => b.asset === symbol[0]),
    [user, symbol],
  );
  const secondaryBalance = useMemo(
    () => user?.balances.find((b) => b.asset === symbol[1]),
    [user, symbol],
  );

  return (
    <div className="bg-bg mx-auto max-w-4xl rounded-lg p-4 font-sans text-white">
      {/* Вкладки */}
      <div className="mb-4 flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white">Limit</button>
        <button className="font-semibold text-white">Market</button>
        <div className="flex items-center space-x-1">
          <button className="text-gray-400 hover:text-white">Stop Limit</button>
          <InfoIcon />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Панель покупки */}
        <div className="flex flex-col space-y-3">
          {/* Поле "Price" */}
          <div className="text-PrimaryText border-InputLine selection:bg-PrimaryYellow focus-within:border-PrimaryYellow flex min-h-10 w-full cursor-text items-center justify-between gap-2 rounded-md border bg-transparent pr-3 pl-2 transition-colors duration-300 outline-none">
            <span className="font-medium text-white">Price</span>
            {/*<input*/}
            {/*  inputMode="numeric"*/}
            {/*  type="text"*/}
            {/*  className="placeholder:text-TertiaryText caret-PrimaryYellow min-w-0 flex-1 border-none bg-transparent text-end leading-normal outline-none placeholder:text-[13px] placeholder:font-medium md:placeholder:text-[14px]"*/}
            {/*/>*/}
            Market Price
            {/*<SelectTest value={value2} setValue={setValue2}>*/}
            {/*  <SelectItem value="usdt">USDT</SelectItem>*/}
            {/*  <SelectItem value="btc">BTC</SelectItem>*/}
            {/*  <SelectItem value="eth">Ethereum</SelectItem>*/}
            {/*</SelectTest>*/}
          </div>

          {/* Поле "Total" */}
          <div className="text-PrimaryText border-InputLine selection:bg-PrimaryYellow focus-within:border-PrimaryYellow flex min-h-10 w-full cursor-text items-center rounded-md border bg-transparent pr-3 pl-2 transition-colors duration-300 outline-none">
            <span className="font-medium text-white">Total</span>
            <input
              value={buyInput}
              onChange={(e) =>
                setBuyInput(e.target.value.replace(/[^\d.]/g, ""))
              }
              inputMode="decimal"
              type="text"
              className="placeholder:text-TertiaryText caret-PrimaryYellow min-w-0 flex-1 border-none bg-transparent text-end leading-normal outline-none placeholder:text-[13px] placeholder:font-medium md:placeholder:text-[14px]"
            />
            <SelectTest value={buyValue} setValue={setBuyValue}>
              <SelectItem value={symbol[0]}>{symbol[0]}</SelectItem>
              <SelectItem value={symbol[1]}>{symbol[1]}</SelectItem>
            </SelectTest>
          </div>
          <Slider />

          <div className="flex flex-col space-y-1 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>Avbl</span>
              <span>
                {secondaryBalance?.free || 0} {symbol[1]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="cursor-pointer text-green-500 hover:underline">
                Max Buy
              </span>
              <span>
                {secondaryBalance && ticker
                  ? +secondaryBalance.free / +ticker.lastPrice
                  : ""}{" "}
                {symbol[0]}
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              makeOrder({
                side: "BUY",
                type: "MARKET",
                symbol: symbol.join(""),
                quantity: buyInput,
              })
            }
            className="bg-Buy w-full cursor-pointer rounded-md py-2.5 font-semibold text-white transition-colors hover:opacity-80"
          >
            Buy {symbol[0]}
          </button>
        </div>

        {/* Панель продажи */}
        <div className="flex flex-col space-y-3">
          {/* Поле "Price" */}
          <div className="text-PrimaryText border-InputLine selection:bg-PrimaryYellow focus-within:border-PrimaryYellow flex min-h-10 w-full cursor-text items-center justify-between gap-2 rounded-md border bg-transparent pr-3 pl-2 transition-colors duration-300 outline-none">
            <span className="font-medium text-white">Price</span>
            {/*<input*/}
            {/*  inputMode="numeric"*/}
            {/*  type="text"*/}
            {/*  className="placeholder:text-TertiaryText caret-PrimaryYellow min-w-0 flex-1 border-none bg-transparent text-end leading-normal outline-none placeholder:text-[13px] placeholder:font-medium md:placeholder:text-[14px]"*/}
            {/*/>*/}
            Market Price
            {/*<SelectTest value={value2} setValue={setValue2}>*/}
            {/*  <SelectItem value="usdt">USDT</SelectItem>*/}
            {/*  <SelectItem value="btc">BTC</SelectItem>*/}
            {/*  <SelectItem value="eth">Ethereum</SelectItem>*/}
            {/*</SelectTest>*/}
          </div>
          {/* Поле "Amount" */}
          <div className="text-PrimaryText border-InputLine selection:bg-PrimaryYellow focus-within:border-PrimaryYellow flex min-h-10 w-full cursor-text items-center rounded-md border bg-transparent pr-3 pl-2 transition-colors duration-300 outline-none">
            <span className="font-medium text-white">Total</span>
            <input
              value={sellInput}
              onChange={(e) =>
                setSellInput(e.target.value.replace(/[^\d.]/g, ""))
              }
              inputMode="numeric"
              type="text"
              className="placeholder:text-TertiaryText caret-PrimaryYellow min-w-0 flex-1 border-none bg-transparent text-end leading-normal outline-none placeholder:text-[13px] placeholder:font-medium md:placeholder:text-[14px]"
            />
            <SelectTest value={sellValue} setValue={setSellValue}>
              <SelectItem value={symbol[1]}>{symbol[1]}</SelectItem>
              <SelectItem value={symbol[0]}>{symbol[0]}</SelectItem>
            </SelectTest>
          </div>
          <Slider />

          <div className="flex flex-col space-y-1 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>Avbl</span>
              <span>
                {firstBalance?.free || 0} {symbol[0]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="cursor-pointer text-red-500 hover:underline">
                Max Sell
              </span>
              <span>
                {firstBalance && ticker
                  ? +firstBalance.free * +ticker.lastPrice
                  : ""}{" "}
                {symbol[1]}
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              makeOrder({
                side: "SELL",
                type: "MARKET",
                symbol: symbol.join(""),
                quantity: sellInput,
              })
            }
            className="bg-Sell w-full cursor-pointer rounded-md py-2.5 font-semibold text-white transition-colors hover:opacity-80"
          >
            Sell {symbol[0]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
