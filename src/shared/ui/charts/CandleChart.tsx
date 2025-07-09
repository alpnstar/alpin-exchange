'use client';

import {cn} from '@/shared/lib/cn';
import {
	CandlestickData,
	CandlestickSeries,
	ChartOptions,
	createChart,
	DeepPartial,
	IChartApi,
	ISeriesApi,
	SeriesOptionsMap,
	Time
} from 'lightweight-charts';
import React, {useEffect, useRef} from 'react';
import {defaultChartOptions, defaultCandlestickSeriesOptions} from '@/shared/config/charts';

interface ChartComponentProps {
	data: CandlestickData<Time>[];
	options?: DeepPartial<ChartOptions>;
	seriesOptions?: DeepPartial<SeriesOptionsMap['Candlestick']>;
	className?: string;
}

export const CandleChart = (props: ChartComponentProps) => {
	const {
		data,
		options: customOptions,
		seriesOptions: customSeriesOptions,
		className
	} = props;

	const chartContainerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

	useEffect(() => {
		if (!chartContainerRef.current) return;

		const chart = createChart(chartContainerRef.current, {...defaultChartOptions, ...customOptions});
		const candleStickSeries = chart.addSeries(CandlestickSeries, {...defaultCandlestickSeriesOptions, ...customSeriesOptions});

		chartRef.current = chart;
		seriesRef.current = candleStickSeries;

		return () => {
			chart.remove();
			chartRef.current = null;
			seriesRef.current = null;
		};
	}, [customOptions, customSeriesOptions]);

	useEffect(() => {
		if (seriesRef.current && data) {
			seriesRef.current.setData(data);
		}
	}, [data]);

	return <div ref={chartContainerRef} className={cn('h-full w-full', className)}/>;
};
