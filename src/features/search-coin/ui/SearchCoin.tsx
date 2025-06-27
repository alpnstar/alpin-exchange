import React, {FC, useState} from 'react';
import {InputLink} from '@/features/search-coin/ui/InputLink';
import {SideBar} from '@/shared/ui/sidebar';
import {SearchContent} from '@/features/search-coin/ui/SearchContent';

interface ISearchCoinProps {

}

export const SearchCoin:FC<ISearchCoinProps> = ({}) => {
	const [open, setOpen] = useState(false);
  return (

	    <SideBar   sizeVariant="secondary" trigger={<div><InputLink mobile={true}/></div>} title={''} open={open} setOpen={setOpen}>
		   <SearchContent  setOpen={setOpen}/>
	    </SideBar>
  );
};