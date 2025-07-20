import React, { FC } from "react";
import Link from "next/link";

export const Logo: FC = ({}) => {
  return (
    <div className="md:w-31">
      <Link href="/">ALPINCE</Link>
    </div>
  );
};
