'use client';

import {cn} from '@/shared/lib/cn';
import {CandlestickData, CandlestickSeries, ColorType, createChart, Time} from 'lightweight-charts';
import React, {useEffect, useRef} from 'react';

interface ChartComponentProps {
	data: CandlestickData[];
	colors?: {
		backgroundColor?: string;
		textColor?: string;
		upColor?: string;
		downColor?: string;
	};
}

const ChartComponent = (props: ChartComponentProps) => {
	const {
		data,
		colors: {
			backgroundColor = '#181a20',
			textColor = 'white',
			upColor = '#26a69a',
			downColor = '#ef5350'
		} = {}
	} = props;

	const chartContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const chartContainer = chartContainerRef.current;
		if (!chartContainer) {
			return;
		}

		const chart = createChart(chartContainer, {
			layout: {
				background: {type: ColorType.Solid, color: backgroundColor},
				textColor
			},
			timeScale: {
				timeVisible: true,
				secondsVisible: false
			},
			autoSize: true
		});

		const candleStickSeries = chart.addSeries(CandlestickSeries, {
			upColor,
			downColor,
			borderVisible: false,
			wickUpColor: upColor,
			wickDownColor: downColor
		});

		candleStickSeries.setData(data);
		chart.timeScale().fitContent();

		return () => {
			chart.remove();
		};
	}, [data, backgroundColor, textColor, upColor, downColor]);

	return <div ref={chartContainerRef} className="h-full w-full"/>;
};

const initialData: CandlestickData[] = [
	{open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1696942800 as Time},
	{open: 9.55, high: 9.99, low: 9.49, close: 9.66, time: 1696942860 as Time},
	{open: 9.66, high: 10.03, low: 9.58, close: 9.88, time: 1696942920 as Time}
];

interface ChartWrapperProps extends Omit<ChartComponentProps, 'data'> {
	className?: string;
}

export function ChartWrapper({className, ...props}: ChartWrapperProps) {
	return (
		<div className={cn('w-full h-full', className)}>
			<ChartComponent {...props} data={initialData}/>
		</div>
	);
}
