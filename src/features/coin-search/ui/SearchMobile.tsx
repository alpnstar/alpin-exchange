import React, { FC, useState } from "react";
import { InputLink } from "@/features/coin-search/ui/InputLink";
import { SideBar } from "@/shared/ui/sidebar";
import { SearchContent } from "@/features/coin-search/ui/SearchContent";

export const SearchMobile: FC = ({}) => {
  const [open, setOpen] = useState(false);
  return (
    <SideBar
      sizeVariant="secondary"
      trigger={
        <div>
          <InputLink mobile={true} />
        </div>
      }
      title={""}
      open={open}
      setOpen={setOpen}
    >
      <SearchContent setOpen={setOpen} />
    </SideBar>
  );
};
