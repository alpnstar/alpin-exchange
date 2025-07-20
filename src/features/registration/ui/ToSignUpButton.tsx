import React, { FC } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

interface IToSignUpButton {
  className?: string;
  width?: string;
  height?: string;
}

export const ToSignUpButton: FC<IToSignUpButton> = ({
  className,
  height,
  width,
}) => {
  return (
    <Link
      className={`${width ? width : ""} ${height ? height : ""}`}
      href={"/registration"}
    >
      <Button variant="primary" className={className}>
        Sign Up
      </Button>
    </Link>
  );
};
