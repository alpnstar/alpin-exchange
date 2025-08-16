import React, { FC } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

interface IToSignInButton {
  className?: string;
  width?: string;
  height?: string;
}

export const ToSignInButton: FC<IToSignInButton> = ({
  className,
  height,
  width,
}) => {
  return (
    <Link
      className={`${width ? width : ""} ${height ? height : ""}`}
      href={"/login"}
    >
      <Button variant="primary" className={className}>
        Sign In
      </Button>
    </Link>
  );
};
