import { ColorType, DeepPartial, ChartOptions } from 'lightweight-charts';

/**
 * Общедоступная конфигурация по умолчанию для всех графиков в приложении.
 * Позволяет централизованно управлять их внешним видом.
 */
export const defaultChartOptions: DeepPartial<ChartOptions> = {
    layout: {
        background: { type: ColorType.Solid, color: '#181a20' },
        textColor: 'white',
    },
    timeScale: {
        timeVisible: true,
        secondsVisible: false,
    },
    autoSize: true,
};

// Здесь же можно хранить и другие конфиги, например для серий
export const defaultCandlestickSeriesOptions = {
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
};
