
"use client";

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface SearchHistoryProps {
  isVisible: boolean;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  isVisible,
}) => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (isVisible) {
      const storedHistory = localStorage.getItem("pairSearchHistory");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    }
  }, [isVisible]);

  const handleClearHistory = () => {
    localStorage.removeItem("pairSearchHistory");
    setHistory([]);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      className="bg-bg absolute inset-0 z-20 h-full w-full mt-2.5 px-4 pt-12"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">Search History</span>
        <svg
          onClick={handleClearHistory}
          className="bn-svg hover:text-PrimaryText text-IconNormal !h-[16px] !w-[16px] cursor-pointer"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" d="M3 4h18v3H3z"></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 2H9v2h6V2zm4 5H5v14h14V7zm-8.5 2H8v9h2.5V9zm3 0H16v9h-2.5V9z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      {history.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-2">
          {history.map((item) => (
            <li
              key={item}
              className="bg-Input inline-block cursor-pointer rounded-sm px-2.5 py-0.5 text-sm"
            >
              <Link href={`/trade/${item}`}>{item}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

