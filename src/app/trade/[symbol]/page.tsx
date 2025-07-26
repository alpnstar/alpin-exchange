import { notFound } from "next/navigation";
import React from "react";
import { TradePageClient } from "./TradePageClient";
import { validateSymbolOnServer } from "@/shared/api/binance-api";

interface PageProps {
  params: {
    symbol: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { symbol } = params;
  const isSymbolValid = await validateSymbolOnServer(symbol);

  if (!isSymbolValid) {
    notFound();
  }

  return <TradePageClient symbol={symbol} />;
}
