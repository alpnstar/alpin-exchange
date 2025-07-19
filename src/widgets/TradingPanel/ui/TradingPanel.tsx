'use client';

import { ChartWidget } from '@/widgets/chart/ui/ChartWidget';
import { Orderbook } from '@/widgets/orderbook';
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/shared/ui/tabs/Tabs';


export const TradingPanel = () => {
	return (
		<Tabs defaultValue="chart">
			<TabsList>
				<TabsTrigger value={'chart'}>Chart</TabsTrigger>
				<TabsTrigger className="md:hidden block" value={'orderbook'}>Orderbook</TabsTrigger>
			</TabsList>
			<TabsContent value={'chart'}>
				<ChartWidget />
			</TabsContent>
			<TabsContent value={'orderbook'}>
				<Orderbook />
			</TabsContent>
		</Tabs>

	);
};
