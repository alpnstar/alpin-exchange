"use client";

import { cn } from "@/shared/lib/cn";
import {
  CandlestickSeries,
  ChartOptions,
  createChart,
  DeepPartial,
  IChartApi,
  ISeriesApi,
  SeriesOptionsMap,
} from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import {
  defaultCandlestickSeriesOptions,
  defaultChartOptions,
} from "@/shared/config/charts";
import { mapBinanceKlineToCandlestickData } from "@/entities/instrument";
import { BinanceKline } from "@/entities/instrument";
import { usePrevious } from "@/shared/lib/hooks/usePrevious";

interface ChartComponentProps {
  data: BinanceKline[];
  options?: DeepPartial<ChartOptions>;
  seriesOptions?: DeepPartial<SeriesOptionsMap["Candlestick"]>;
  className?: string;
}

export const CandleChart = (props: ChartComponentProps) => {
  const {
    data,
    options: customOptions,
    seriesOptions: customSeriesOptions,
    className,
  } = props;
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const prevData = usePrevious(data);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      ...defaultChartOptions,
      ...customOptions,
    });
    const candleStickSeries = chart.addSeries(CandlestickSeries, {
      ...defaultCandlestickSeriesOptions,
      ...customSeriesOptions,
    });

    chartRef.current = chart;
    seriesRef.current = candleStickSeries;

    if (data.length > 0) {
      candleStickSeries.setData(data.map(mapBinanceKlineToCandlestickData));
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

    const isFullReset =
      prevData.length === 0 ||
      (data.length > 0 && prevData.length > 0 && data[0][0] !== prevData[0][0]);

    if (isFullReset) {
      series.setData(data.map(mapBinanceKlineToCandlestickData));
    } else {
      const lastKline = data[data.length - 1];
      if (lastKline) {
        series.update(mapBinanceKlineToCandlestickData(lastKline));
      }
    }
  }, [data, prevData]);

  return (
    <div ref={chartContainerRef} className={cn("h-full w-full", className)} />
  );
};
