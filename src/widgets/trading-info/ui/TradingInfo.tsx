import React, {FC} from "react";
import {ChartWidget} from '@/widgets/chart/ui/ChartWidget';

export const TradingInfo:FC = ({}) => {

  return (
	  <div
		  className=" rounded-md bg-[#1d1e23] p-2 md:col-start-1 md:col-end-3 md:row-start-2 lg:col-start-2 lg:col-end-3">
		  <ChartWidget/>
	  </div>
  );
};