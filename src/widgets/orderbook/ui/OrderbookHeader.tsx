'use client';
import React from 'react';

export const OrderbookHeader = () => {
    return (
        <div className="flex  text-xs text-gray-500 p-1">
            <span className="w-[96px] text-left">Price (USDT)</span>
            <span className="w-[96px] text-right">Amount (BTC)</span>
            <span className="w-[96px] text-right">Total</span>
        </div>
    );
};
