import "./globals.css";
import type { Metadata } from "next";
import { StoreProvider } from "@/app/providers/StoreProvider";
import React from "react";

export const metadata: Metadata = {
  title: "Alpin Exchange",
  description:
    "Alpin Exchange — проект, представляющий собой упрощенный клон криптобиржи Binance. Реализован базовый функционал: спотовая торговля, книга ордеров, пользовательский кошелек и история сделок.",
};

export default function Page({
                               children,
                             }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className="text-PrimaryText bg-black text-sm">
    <StoreProvider>
      {children}
    </StoreProvider>
    </body>
    </html>
  );

}
