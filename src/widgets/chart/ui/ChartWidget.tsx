'use client';

import {CandleChart} from '@/shared/ui/charts';
import {cn} from '@/shared/lib/cn';
import {useState} from 'react';
import {useGetCandlesQuery} from '@/entities/instrument/model/instrumentApi';
import {useAppSelector} from '@/shared/lib/hooks/useRedux';

interface ChartWidgetProps {
	className?: string;
	symbol: string;
	interval: string;
}

const enum ChartType {
	Candlestick = 'candlesticks',
	Area = 'area',
}

const enum ChartInterval {
	OneSecond = '1s',
	OneMinute = '1m',
	FiveMinutes = '5m',
	TenMinutes = '10m',
	FifteenMinutes = '15m',
}

export function ChartWidget({className, symbol, interval}: ChartWidgetProps) {
	const [currentChart, setCurrentChart] = useState<ChartType>(ChartType.Candlestick);
	const [currentInterval, setCurrentInterval] = useState<ChartInterval>(ChartInterval.OneSecond);

	const {isLoading, error} = useGetCandlesQuery({symbol: 'BTCUSDT', interval: currentInterval});
	const candlestickData = useAppSelector(state => state.instrument.candles);


	const renderChart = () => {
		if (isLoading) return <div>Loading...</div>;
		if (error) return <div>Error loading data</div>;

		switch (currentChart) {
			case ChartType.Candlestick:
				return <CandleChart data={candlestickData}/>;

			default:
				return null;
		}
	};

	return (
		<div className={cn('w-full h-full flex flex-col', className)}>
			<div className="flex gap-2 p-2 bg-gray-800">
				<button onClick={() => setCurrentInterval(ChartInterval.OneSecond)}
				        className={cn('p-2 rounded', {'bg-blue-500': currentInterval === ChartInterval.OneSecond})}>1s
				</button>
				<button onClick={() => setCurrentInterval(ChartInterval.OneMinute)}
				        className={cn('p-2 rounded', {'bg-blue-500': currentInterval === ChartInterval.OneMinute})}>1m
				</button>
				<button onClick={() => setCurrentInterval(ChartInterval.FiveMinutes)}
				        className={cn('p-2 rounded', {'bg-blue-500': currentInterval === ChartInterval.FiveMinutes})}>5m
				</button>
				{/*<button onClick={() => setCurrentChart(ChartType.Candlestick)} className={cn('p-2 rounded', { 'bg-blue-500': currentChart === ChartType.Candlestick })}>Candles</button>*/}
				{/*<button onClick={() => setCurrentChart(ChartType.Area)} className={cn('p-2 rounded', { 'bg-blue-500': currentChart === ChartType.Area })}>Area</button>*/}
			</div>
			<div className="flex-grow">
				{renderChart()}
			</div>
		</div>
	);
}