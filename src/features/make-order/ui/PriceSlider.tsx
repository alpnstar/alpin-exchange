import React from "react";

const PriceSlider = ({ label, currency }) => {
  return (
    <div className="relative">
      <div className="mb-2 flex items-center justify-between">
        <span>{label}</span>
        <span>
          Minimum 1 <span className="font-bold">{currency}</span>
        </span>
      </div>
      <div className="relative h-1 w-full rounded-full bg-gray-600">
        <div className="bg-primary absolute top-0 left-0 h-full w-1/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white shadow-md"></div>
      </div>
    </div>
  );
};

export default PriceSlider;
