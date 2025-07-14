'use client';

import { cn } from '@/shared/lib/cn';
import {
    CandlestickSeries,
    ChartOptions,
    createChart,
    DeepPartial,
    IChartApi,
    ISeriesApi,
    SeriesOptionsMap,
} from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { defaultCandlestickSeriesOptions, defaultChartOptions } from '@/shared/config/charts';
import { mapBinanceKlineMapper } from '@/entities/instrument/lib/mappers';
import { BinanceKline } from '@/entities/instrument/model/types';
import { usePrevious } from '@/shared/lib/hooks/usePrevious';

interface ChartComponentProps {
    data: BinanceKline[];
    options?: DeepPartial<ChartOptions>;
    seriesOptions?: DeepPartial<SeriesOptionsMap['Candlestick']>;
    className?: string;
}

export const CandleChart = (props: ChartComponentProps) => {
    const { data, options: customOptions, seriesOptions: customSeriesOptions, className } = props;

    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
    const prevData = usePrevious(data);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, { ...defaultChartOptions, ...customOptions });
        const candleStickSeries = chart.addSeries(CandlestickSeries, { ...defaultCandlestickSeriesOptions, ...customSeriesOptions });

        chartRef.current = chart;
        seriesRef.current = candleStickSeries;

        if (data.length > 0) {
            candleStickSeries.setData(data.map(mapBinanceKlineMapper));
        }

        return () => {
            chart.remove();
            chartRef.current = null;
            seriesRef.current = null;
        };
    }, [customOptions, customSeriesOptions]);

    useEffect(() => {
        const series = seriesRef.current;
        if (!series || !data || !prevData) {
            return;
        }

        const isFullReset = prevData.length === 0 || (data.length > 0 && prevData.length > 0 && data[0][0] !== prevData[0][0]);

        if (isFullReset) {
            series.setData(data.map(mapBinanceKlineMapper));
        } else {
            const lastKline = data[data.length - 1];
            if (lastKline) {
                series.update(mapBinanceKlineMapper(lastKline));
            }
        }
    }, [data, prevData]);

    return <div ref={chartContainerRef} className={cn('h-full w-full', className)} />;
};
