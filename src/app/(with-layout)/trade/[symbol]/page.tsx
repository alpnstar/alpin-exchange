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
  const splitSymbol = symbol.split("_");
  const joinedSymbol = splitSymbol.join("");

  if (splitSymbol.length !== 2) notFound();
  const isSymbolValid = await validateSymbolOnServer(joinedSymbol);
  if (!isSymbolValid) notFound();

  return <TradePageClient symbol={splitSymbol} />;
}
