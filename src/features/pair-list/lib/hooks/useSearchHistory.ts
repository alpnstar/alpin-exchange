import { useState, useEffect } from "react";

const HISTORY_KEY = "pairSearchHistory";
const MAX_HISTORY_SIZE = 5;

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const addToHistory = (symbol: string) => {
    const newHistory = [
      symbol,
      ...history.filter((item) => item !== symbol),
    ].slice(0, MAX_HISTORY_SIZE);
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return { history, addToHistory, clearHistory };
};
