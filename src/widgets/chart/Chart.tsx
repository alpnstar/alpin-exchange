'use client';
import {CandlestickData, CandlestickSeries, ColorType, createChart, HistogramData} from 'lightweight-charts';
import React, {useEffect, useRef} from 'react';

interface ChartComponentProps {
	data: HistogramData[];
	colors?: {
		backgroundColor?: string;
		lineColor?: string;
		textColor?: string;
		areaTopColor?: string;
		areaBottomColor?: string;
	};
}

export const ChartComponent = (props: ChartComponentProps) => {
	const {
		data,
		colors: {
			backgroundColor = '#181a20',
			lineColor = '#2962ff',
			textColor = 'white',
			areaTopColor = '#2962ff',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)'
		} = {}
	} = props;

	const chartContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const chartContainer = chartContainerRef.current;
		if (!chartContainer) {
			return;
		}
		chartContainer.style.width = '100%';
		chartContainer.style.height = '100%';

		const chart = createChart(chartContainer, {
			layout: {
				background: {type: ColorType.Solid, color: backgroundColor},
				textColor
			},
			timeScale: {
				timeVisible: true,
				secondsVisible: false,
			},

			autoSize: true
		});

		const handleResize = () => {
			chart.applyOptions({width: '100%'});
		};
		chart.timeScale().fitContent();
		const vr = chart.timeScale().getVisibleRange();


		const candleStick = chart.addSeries(CandlestickSeries, {
			upColor: '#26a69a',
			downColor: '#ef5350',
			borderVisible: false,
			wickUpColor: '#26a69a',
			wickDownColor: '#ef5350'
		});

		candleStick.setData(data);

		// const volumeSeries = chart.addSeries(HistogramSeries, {
		// 	priceFormat: {
		// 		type: 'volume'
		// 	},
		// 	priceScaleId: '' // set as an overlay by setting a blank priceScaleId
		// });
		// volumeSeries.priceScale().applyOptions({
		// 	// set the positioning of the volume series
		// 	scaleMargins: {
		// 		top: 0.85, // highest point of the series will be 70% away from the top
		// 		bottom: 0
		// 	}
		// });
		// volumeSeries.setData([
		// 	{value: 1.00, time: {day: 1, month: 1, year: 2022}},
		// 	{value: 1.05, time: {day: 2, month: 1, year: 2022}},
		// 	{value: 0.98, time: {day: 3, month: 1, year: 2022}},
		// 	{value: 1.10, time: {day: 4, month: 1, year: 2022}},
		// 	{value: 1.07, time: {day: 5, month: 1, year: 2022}},
		// 	{value: 1.15, time: {day: 6, month: 1, year: 2022}},
		// 	{value: 1.20, time: {day: 7, month: 1, year: 2022}},
		// 	{value: 1.13, time: {day: 8, month: 1, year: 2022}},
		// 	{value: 1.08, time: {day: 9, month: 1, year: 2022}},
		// 	{value: 1.18, time: {day: 10, month: 1, year: 2022}},
		// 	{value: 1.25, time: {day: 11, month: 1, year: 2022}},
		// 	{value: 1.30, time: {day: 12, month: 1, year: 2022}},
		// 	{value: 1.22, time: {day: 13, month: 1, year: 2022}},
		// 	{value: 1.28, time: {day: 14, month: 1, year: 2022}},
		// 	{value: 1.35, time: {day: 15, month: 1, year: 2022}},
		// 	{value: 1.42, time: {day: 16, month: 1, year: 2022}},
		// 	{value: 1.38, time: {day: 17, month: 1, year: 2022}},
		// 	{value: 1.45, time: {day: 18, month: 1, year: 2022}},
		// 	{value: 1.40, time: {day: 19, month: 1, year: 2022}},
		// 	{value: 1.50, time: {day: 20, month: 1, year: 2022}},
		// 	{value: 1.55, time: {day: 21, month: 1, year: 2022}},
		// 	{value: 1.60, time: {day: 22, month: 1, year: 2022}},
		// 	{value: 1.48, time: {day: 23, month: 1, year: 2022}},
		// 	{value: 1.52, time: {day: 24, month: 1, year: 2022}},
		// 	{value: 1.60, time: {day: 25, month: 1, year: 2022}},
		// 	{value: 1.67, time: {day: 26, month: 1, year: 2022}},
		// 	{value: 1.73, time: {day: 27, month: 1, year: 2022}},
		// 	{value: 1.65, time: {day: 28, month: 1, year: 2022}},
		// 	{value: 1.70, time: {day: 29, month: 1, year: 2022}},
		// 	{value: 1.75, time: {day: 30, month: 1, year: 2022}},
		// 	{value: 1.80, time: {day: 31, month: 1, year: 2022}}
		// ]);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			chart.remove();
		};
	}, [
		data,
		backgroundColor,
		lineColor,
		textColor,
		areaTopColor,
		areaBottomColor
	]);

	return <div ref={chartContainerRef}/>;
};

const initialData: CandlestickData[] = [
	{open: 10, high: 10.63, low: 9.49, close: 9.55, time: new Date('2023-10-10T15:00:00').getTime() / 1000},
	{open: 9.55, high: 9.99, low: 9.49, close: 9.66, time: new Date('2023-10-10T15:01:00').getTime() / 1000},
	{open: 9.55, high: 9.99, low: 9.49, close: 9.66, time: new Date('2023-10-10T15:02:00').getTime() / 1000},
	{open: 9.55, high: 9.99, low: 9.49, close: 9.66, time: new Date('2023-10-10T15:03:00').getTime() / 1000},
	{open: 9.55, high: 9.99, low: 9.49, close: 9.66, time: new Date('2023-10-10T15:04:00').getTime() / 1000},

];

export function ChartWrapper(props: Omit<ChartComponentProps, 'data'>) {
	return <ChartComponent  {...props} data={initialData}></ChartComponent>;
}
