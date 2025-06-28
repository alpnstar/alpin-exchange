import React, {FC, useState} from 'react';
import {Popup} from '@/shared/ui/popup';
import {SearchIcon} from '@/shared/ui/icon';
import {SearchContent} from '@/features/search-coin/ui/SearchContent';


export const SearchDesktop:FC = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
      <Popup className="w-[367px]" open={open} setOpen={setOpen}  trigger={<SearchIcon
          className="hidden md:block cursor-pointer fill-PrimaryText w-6 h-6 hover:fill-PrimaryYellow"
          aria-label="Search"/>}>
        <SearchContent setOpen={setOpen}/>
      </Popup>
  );
};