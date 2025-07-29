import React, { FC, useState } from "react";
import { SearchBar } from "@/features/coin-search/ui/SearchBar";
import { PairList } from "@/features/pair-list";

interface ISearchContentProps {
  setOpen: (open: boolean) => void;
}

export const SearchContent: FC<ISearchContentProps> = ({ setOpen }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState<string>('');
  return (
      <PairList/>
  );
};