"use client";
import React from "react";
import { OrderbookTableRow } from "./OrderbookTableRow";
import { OrderbookTableHeader } from "./OrderbookTableHeader";

interface OrderbookTableProps {
  data: [string, string][];
  type: "bids" | "asks";
}

export const OrderbookTable: React.FC<OrderbookTableProps> = ({
  data,
  type,
}) => {
  return (
    <div className="flex-grow">
      <OrderbookTableHeader />
      <div className="overflow-y-auto">
        <ul>
          {data.map(([price, quantity]) => (
            <OrderbookTableRow
              key={price}
              price={price}
              quantity={quantity}
              type={type}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
