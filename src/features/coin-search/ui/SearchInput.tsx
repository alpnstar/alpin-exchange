import React, { FC } from "react";
import { Input, InputProps } from "@/shared/ui/input";
import { SearchIcon } from "@/shared/ui/icon/ui/SearchIcon";

export const SearchInput: FC<InputProps> = (props) => {
  return (
    <Input
      {...props}
      leftIcon={<SearchIcon className="fill-[#848E9C]" />}
      placeholder="Coin, Function, Announcement"
    />
  );
};
