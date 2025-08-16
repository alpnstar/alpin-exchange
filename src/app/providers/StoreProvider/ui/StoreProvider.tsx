"use client";

import { Provider } from "react-redux";
import { store } from "../config/store";
import { ReactNode, useEffect } from "react";
import { initAuthData } from "@/entities/user";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  useEffect(() => {
    store.dispatch(initAuthData());
  }, []);
  return <Provider store={store}>{children}</Provider>;
};
