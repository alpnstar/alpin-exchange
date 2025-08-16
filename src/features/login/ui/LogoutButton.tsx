import React, { FC } from "react";
import { Button } from "@/shared/ui/button";
import { useAppDispatch } from "@/shared/lib";
import { logout } from "@/entities/user";

interface ILogoutButton {
  className?: string;
  width?: string;
  height?: string;
}

export const LogoutButton: FC<ILogoutButton> = ({
  className,
  height,
  width,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className={`${width ? width : ""} ${height ? height : ""}`}>
      <Button onClick={() => dispatch(logout())} variant="secondary" className={className}>
        Logout
      </Button>
    </div>
  );
};
