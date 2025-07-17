'use client';
import React from 'react';
import { OrderbookRow } from './OrderbookRow';
import { OrderbookHeader } from './OrderbookHeader';

interface OrderbookTableProps {
    data: [string, string][];
    maxTotal: number;
    type: 'bids' | 'asks';
}

export const OrderbookTable: React.FC<OrderbookTableProps> = ({ data, maxTotal, type }) => {
    return (
        <div>
            <OrderbookHeader />
            <div className="overflow-y-auto h-full">
                <ul>
                    {data.map(([price, quantity]) => (
                        <OrderbookRow
                            key={price}
                            price={price}
                            quantity={quantity}
                            maxTotal={maxTotal}
                            type={type}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};
