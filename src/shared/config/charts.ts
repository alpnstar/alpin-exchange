import {
  CandlestickSeriesOptions,
  ChartOptions,
  ColorType,
  DeepPartial,
} from "lightweight-charts";

export const defaultChartOptions: DeepPartial<ChartOptions> = {
  layout: {
    background: { type: ColorType.Solid, color: "#181a20" },
    textColor: "white",
  },
  timeScale: {
    timeVisible: true,
    secondsVisible: false,
  },

  autoSize: true,
};

export const defaultCandlestickSeriesOptions: Partial<CandlestickSeriesOptions> =
  {
    upColor: "#66bf87",
    downColor: "#e74c5a",
    borderVisible: false,
    wickUpColor: "#66bf87",
    wickDownColor: "#e74c5a",
    priceFormat: {
      type: "price",
      precision: 8,
      minMove: 0.00000001,
    },
  };
