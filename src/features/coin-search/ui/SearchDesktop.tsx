import React, { FC, useState } from "react";
import { Popup } from "@/shared/ui/popup";
import { SearchIcon } from "@/shared/ui/icon";
import { SearchContent } from "@/features/coin-search/ui/SearchContent";

export const SearchDesktop: FC = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popup
      className="w-[367px]"
      open={open}
      setOpen={setOpen}
      trigger={
        <SearchIcon
          className="fill-PrimaryText hover:fill-PrimaryYellow hidden h-6 w-6 cursor-pointer md:block"
          aria-label="Search"
        />
      }
    >
      <SearchContent setOpen={setOpen} />
    </Popup>
  );
};
