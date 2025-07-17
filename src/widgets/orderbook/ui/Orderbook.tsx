'use client';
import React from 'react';
import {useOrderbook} from '../lib/hooks';
import {OrderbookTable} from './OrderbookTable';

export const Orderbook = ({className}: {className?: string}) => {
	const {bids, asks, isLoading, isError, maxTotalBids, maxTotalAsks} = useOrderbook('BTCUSDT');

	return (
		<div className={`rounded-md bg-bg p-2 lg:row-start-2 lg:row-end-4 ${className}`}>
			{isLoading ? <div>Loading...</div> : isError ? <div>Error loading data</div> : !!bids.length && !!asks.length ? (<div className="h-full flex flex-col">
				<h2 className="text-lg font-semibold mb-2">Order Book</h2>
				<div className="flex-grow flex flex-col gap-4 ">
					<OrderbookTable data={asks} maxTotal={maxTotalAsks} type="asks"/>
					<OrderbookTable data={bids} maxTotal={maxTotalBids} type="bids"/>
				</div>
			</div>) : false}
		</div>
	);
};
