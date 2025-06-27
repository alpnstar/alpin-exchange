import React, {FC} from "react";
import {SearchBar} from '@/features/search-coin/ui/SearchBar';

interface ISearchContentProps {
  setOpen: (open: boolean) => void
}

export const SearchContent:FC<ISearchContentProps> = ({ setOpen}) => {
  
  return (
    <div>
      <SearchBar cancelVariant="persistent" onCancelClick={() => setOpen(false)}/>
    </div>
  );
};