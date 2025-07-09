'use client';

import { CandleChart } from '@/shared/ui/charts';
import { cn } from '@/shared/lib/cn';
import { useState } from 'react';
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

export function ChartWidget({ className, symbol, interval }: ChartWidgetProps) {
	const [currentChart, setCurrentChart] = useState<ChartType>(ChartType.Candlestick);

	const { isLoading, error } = useGetCandlesQuery({ symbol: 'BTCUSDT', interval: '1m'  });

	const candlestickData = useAppSelector(state => state.instrument.candles);

	const renderChart = () => {
		if (isLoading) return <div>Loading...</div>;
		if (error) return <div>Error loading data</div>;

		switch (currentChart) {
			case ChartType.Candlestick:
				return <CandleChart data={candlestickData} />;

			default:
				return null;
		}
	};

	return (
		<div className={cn('w-full h-full flex flex-col', className)}>
			<div className="flex gap-2 p-2 bg-gray-800">
				<button onClick={() => setCurrentChart(ChartType.Candlestick)} className={cn('p-2 rounded', { 'bg-blue-500': currentChart === ChartType.Candlestick })}>Candles</button>
				<button onClick={() => setCurrentChart(ChartType.Area)} className={cn('p-2 rounded', { 'bg-blue-500': currentChart === ChartType.Area })}>Area</button>
			</div>
			<div className="flex-grow">
				{renderChart()}
			</div>
		</div>
	);
}