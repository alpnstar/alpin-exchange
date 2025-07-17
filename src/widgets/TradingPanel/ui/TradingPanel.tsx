'use client';

import { ChartWidget } from '@/widgets/chart/ui/ChartWidget';
import { Orderbook } from '@/widgets/orderbook';
import * as Tabs from '@radix-ui/react-tabs';
import { cn } from '@/shared/lib/cn';
import React from 'react';

const TradingPanelTabTrigger = ({ value, children, className }: { value: string; children: React.ReactNode, className?: string }) => (
	<Tabs.Trigger
		value={value}
		className={cn(
			'relative h-[38px]',
			'text-TertiaryText',
			'data-[state=active]:text-textWhite',
			":after:block after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-[16px] after:-translate-x-1/2 after:bg-PrimaryYellow after:opacity-0 transition-all duration-300 after:duration-300 after:content-['']",
			' data-[state=active]:after:opacity-100',
			className
		)}
	>
		{children}
	</Tabs.Trigger>
);


export const TradingPanel = () => {
	return (
		<div
			className="rounded-md bg-bg md:row-start-2 md:col-start-2 md:col-end-3 lg:col-start-2 lg:col-end-3">
			<Tabs.Root defaultValue="chart" className="flex h-full w-full flex-col font-medium">
				<Tabs.List className="flex gap-6 border-b border-gray-800 px-4">
					<TradingPanelTabTrigger value="chart">Chart</TradingPanelTabTrigger>
					<TradingPanelTabTrigger className="md:hidden block" value="orderbook">Orderbook</TradingPanelTabTrigger>
				</Tabs.List>
				<Tabs.Content className="grow" value="chart">
					<ChartWidget />
				</Tabs.Content>
				<Tabs.Content className="grow" value="orderbook">
					<Orderbook />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
};
