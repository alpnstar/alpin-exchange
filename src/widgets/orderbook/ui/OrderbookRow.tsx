'use client';
import React from 'react';
import {formatNumberWithCommas} from '@/shared/lib/formatters';

interface OrderbookRowProps {
	price: string;
	quantity: string;
	maxTotal: number;
	type: 'bids' | 'asks';
}

export const OrderbookRow: React.FC<OrderbookRowProps> = ({price, quantity, maxTotal, type}) => {
	const total = parseFloat(price) * parseFloat(quantity);
	// const percentage = (total / maxTotal) * 100;

	const rowColor = type === 'bids' ? 'bg-buy/[.10]' : 'bg-sell/[.10]';
	return (
		<li className={`relative ${rowColor}  text-right flex  p-1 text-xs`}>
			<div
				className={`absolute top-0 left-0 h-full bg-bg`}
				style={{width: `${100 -Math.min((total / 100000) * 100, 100)}%`}}
			></div>
			<span className={`w-[96px] text-left z-10 ${type === 'bids' ? 'text-buy' : 'text-sell'}`}>{formatNumberWithCommas(+price)}</span>
			<span className="w-[96px] text-right z-10">{formatNumberWithCommas(+quantity)}</span>
			<span
				className="w-[96px] overflow-hidden text-right z-10">{formatNumberWithCommas(+total, {decimals: 2})}</span>
		</li>
	);
};
