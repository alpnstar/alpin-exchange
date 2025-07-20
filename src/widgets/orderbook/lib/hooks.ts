"use client";
import { useGetOrderbookQuery } from "@/entities/orderbook";
import { useAppSelector } from "@/shared/lib/hooks/useRedux";
import { useEffect, useMemo } from "react";

export const useOrderbook = (symbol: string) => {
  const { isLoading, isError, isFetching } = useGetOrderbookQuery({ symbol });
  const orderbookData = useAppSelector((state) => state.orderbook.data);
  const asks = useMemo(
    () => orderbookData?.asks.slice(0, 15).reverse() || [],
    [orderbookData],
  );
  const bids = useMemo(
    () => orderbookData?.bids.slice(0, 15) || [],
    [orderbookData],
  );

  const maxTotalBids = useMemo(() => {
    return bids.reduce((acc, [, quantity]) => acc + parseFloat(quantity), 0);
  }, [bids]);

  const maxTotalAsks = useMemo(() => {
    return asks.reduce((acc, [, quantity]) => acc + parseFloat(quantity), 0);
  }, [asks]);

  return {
    bids,
    asks,
    isLoading,
    isFetching,
    isError,
    maxTotalBids,
    maxTotalAsks,
  };
};
