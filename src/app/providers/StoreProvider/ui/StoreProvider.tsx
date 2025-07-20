"use client";

import { Provider } from "react-redux";
import { store } from "../config/store";
import { ReactNode } from "react";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
