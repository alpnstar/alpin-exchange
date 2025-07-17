'use client';
import React from 'react';
import {Ticker} from '@/widgets/ticker/ui/Ticker';
import {Orderbook} from '@/widgets/orderbook';
import {TradingPanel} from '@/widgets/TradingPanel';
import { useIsMobile } from '@/shared/lib/hooks/use-mobile';

export default function Home() {
	const isMobile = useIsMobile(768);

	return (
		<div>
			<div className="wrapper h-screen mt-2">
				<div
					className="grid h-auto flex-1 grid-cols-[1fr] grid-rows-[minmax(50px,auto)_minmax(550px,auto)_auto] gap-2 md:grid-cols-[1fr_1fr_1fr] md:grid-rows-[minmax(50px,auto)_545px_266px_300px] lg:grid-cols-[320px_1fr_200px] lg:grid-rows-[minmax(50px,auto)_600px_minmax(260px,auto)_560px]">
					<Ticker/>
					{!isMobile && <Orderbook/>}
					<TradingPanel/>
					<div
						className="hidden rounded-md bg-bg p-2 md:block md:row-start-2 md:row-end-4 lg:col-start-2 lg:row-start-3 lg:row-end-auto">
						<p>Trade Form</p>
					</div>

					<div className="hidden flex-col gap-2 md:flex lg:row-start-1 lg:row-end-4">
						<div className="hidden flex-grow rounded-md bg-bg p-2 lg:block">
							<p>Pair List</p>
						</div>
						<div className="hidden flex-grow rounded-md bg-bg p-2 md:block">
							<p>Market Trades(сделки на рынке)</p>
						</div>
						<div className="hidden h-[150px] rounded-md bg-bg p-2 lg:block">
							<p>Top Movers</p>
						</div>
					</div>

					<div className="col-start-1 col-end-[-1] rounded-md bg-bg p-2">
						<p>Open Orders / Order History</p>
					</div>
				</div>
			</div>
		</div>
	);
}

