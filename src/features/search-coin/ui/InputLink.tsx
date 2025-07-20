import React, { FC } from "react";
import { SearchInput } from "@/features/search-coin/ui/SearchInput";

interface IInputLinkProps {
  mobile: boolean;
}

export const InputLink: FC<IInputLinkProps> = ({ mobile }) => {
  return mobile ? (
    <SearchInput disabled containerClassName="mt-6" />
  ) : (
    <svg
      width="20px"
      height="20px"
      className="fill-white"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    />
  );
};
