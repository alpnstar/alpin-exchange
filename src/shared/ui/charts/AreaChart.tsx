'use client';

import {cn} from '@/shared/lib/cn';
import {
	AreaData,
	AreaSeries,
	ChartOptions,
	ColorType,
	createChart,
	DeepPartial,
	SeriesOptionsMap
} from 'lightweight-charts';
import React, {useEffect, useRef} from 'react';

interface ChartComponentProps {
	data: AreaData[];
	options?: DeepPartial<ChartOptions>;
	seriesOptions?: DeepPartial<SeriesOptionsMap['Candlestick']>;
	className?: string;
}

export const AreaChart = (props: ChartComponentProps) => {
	const {
		data,
		options: customOptions,
		seriesOptions: customSeriesOptions,
		className
	} = props;

	const chartContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const chartContainer = chartContainerRef.current;
		if (!chartContainer) return;

		const defaultOptions: DeepPartial<ChartOptions> = {
			layout: {
				background: {type: ColorType.Solid, color: '#181a20'},
				textColor: 'white'
			},
			timeScale: {
				timeVisible: true,
				secondsVisible: false
			},
			autoSize: true
		};

		const defaultSeriesOptions: DeepPartial<SeriesOptionsMap['Area']> = {};

		const chart = createChart(chartContainer, {...defaultOptions, ...customOptions});
		const areaSeries = chart.addSeries(AreaSeries, {...defaultSeriesOptions, ...customSeriesOptions});

		areaSeries.setData(data);
		chart.timeScale().fitContent();

		return () => chart.remove();
	}, [data, customOptions, customSeriesOptions]);

	return <div ref={chartContainerRef} className={cn('h-full w-full', className)}/>;
};
