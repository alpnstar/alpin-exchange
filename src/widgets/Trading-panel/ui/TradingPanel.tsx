"use client";

import { ChartWidget } from "@/widgets/chart/ui/ChartWidget";
import { Orderbook } from "@/widgets/orderbook";
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/tabs/Tabs";
import { Trades } from "@/widgets/trades/ui/Trades";

export const TradingPanel = () => {
  return (
    <Tabs
      className="bg-bg rounded-md md:col-start-2 md:col-end-3 md:row-start-2 lg:col-start-2 lg:col-end-3"
      defaultValue="chart"
    >
      <TabsList className="px-4">
        <TabsTrigger value={"chart"}>Chart</TabsTrigger>
        <TabsTrigger className="block md:hidden" value={"orderbook"}>
          Orderbook
        </TabsTrigger>
        <TabsTrigger className="block md:hidden" value={"trades"}>
          Trades
        </TabsTrigger>
      </TabsList>
      <TabsContent value={"chart"}>
        <ChartWidget />
      </TabsContent>
      <TabsContent value={"orderbook"}>
        <Orderbook />
      </TabsContent>
      <TabsContent value={"trades"}>
        <Trades listHeight="535px" />
      </TabsContent>
    </Tabs>
  );
};
