'use client';
import {ChartWrapper} from '@/widgets/chart/Chart';
import React from 'react';
import {useGetCandlesQuery} from '@/entities/coin/model/coinApi';

export default function Home() {
  const {data:coins} = useGetCandlesQuery({interval: '1M', symbol: 'BTCUSDT'});
  console.log(coins);
  return (
    <div>
      <div className="wrapper h-screen">
        <div
          className="grid h-full flex-1 grid-cols-[1fr] grid-rows-[100px_1fr_auto] gap-2 md:grid-cols-[1fr_1fr_1fr] md:grid-rows-[100px_545px_266px_300px] lg:grid-cols-[200px_1fr_200px] lg:grid-rows-[100px_545px_266px_560px]">
          <div
            className="col-start-1 flex items-center rounded-md bg-[#1d1e23] p-4 md:col-end-[-1] lg:col-end-3">
            <p>BTC/USDT | Price | 24h Change | etc.</p>
          </div>

          <div className="hidden rounded-md bg-[#1d1e23] p-2 md:block lg:row-start-2 lg:row-end-4">
            <p>Order Book(биржевой стакан)</p>
          </div>

          <div
            className=" p-5 rounded-md bg-[#1d1e23] p-2 md:col-start-1 md:col-end-3 md:row-start-2 lg:col-start-2 lg:col-end-3">
            <ChartWrapper/>
          </div>
          <div
            className="hidden rounded-md bg-[#1d1e23] p-2 md:block md:row-start-2 md:row-end-4 lg:col-start-2 lg:row-start-3 lg:row-end-auto">
            <p>Trade Form</p>
          </div>

          <div className="hidden flex-col gap-2 md:flex lg:row-start-1 lg:row-end-4">
            <div className="hidden flex-grow rounded-md bg-[#1d1e23] p-2 lg:block">
              <p>Pair List</p>
            </div>
            <div className="hidden flex-grow rounded-md bg-[#1d1e23] p-2 md:block">
              <p>Market Trades(сделки на рынке)</p>
            </div>
            <div className="hidden h-[150px] rounded-md bg-[#1d1e23] p-2 lg:block">
              <p>Top Movers</p>
            </div>
          </div>

          <div className="col-start-1 col-end-[-1] rounded-md bg-[#1d1e23] p-2">
            <p>Open Orders / Order History</p>
          </div>
        </div>
      </div>
    </div>
  );
}