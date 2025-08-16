import React, { FC, useEffect, useState } from "react";
import { SearchBar } from "@/features/coin-search/ui/SearchBar";
import { useLazySearchQuery } from "@/features/coin-search/model/searchApi";

interface ISearchContentProps {
  setOpen: (open: boolean) => void;
}

export const SearchContent: FC<ISearchContentProps> = ({ setOpen }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState<string>("");
  return (
    <div>
      <SearchBar
        cancelVariant="persistent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onCancelClick={() => setOpen(false)}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
      />
      <div>
        <ul>
          <li>1</li>
        </ul>
      </div>
    </div>
  );
};
