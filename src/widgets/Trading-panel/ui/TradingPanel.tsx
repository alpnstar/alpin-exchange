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
import { Trades } from "@/entities/trades/ui/Trades";
import { PairList } from "@/widgets/pair-list";

export const TradingPanel = () => {
  return (
    <Tabs
      className="bg-bg flex h-auto flex-col rounded-md md:col-start-2 md:col-end-3 md:row-start-2 lg:col-start-2 lg:col-end-3"
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
      <TabsContent className="flex grow basis-0 flex-col" value={"orderbook"}>
        <Orderbook />
      </TabsContent>
      <TabsContent className="flex grow basis-0 flex-col" value={"trades"}>
        <Trades />
      </TabsContent>
    </Tabs>
  );
};
