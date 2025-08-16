import React, { FC, useRef } from "react";
import { Input, InputProps } from "@/shared/ui/input";
import { cn } from "@/shared/lib/cn";
import { SearchIcon } from "@/shared/ui/icon/ui/SearchIcon";

export interface SearchBarProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cancelVariant?: "onFocus" | "persistent";
  onCancelClick?: () => void;
  isFocused: boolean;
  setIsFocused: (value: boolean) => void;
  blurException?: React.RefObject<HTMLInputElement>;
}

export const SearchBar: FC<SearchBarProps> = ({
  className,
  cancelVariant = "onFocus",
  onCancelClick,
  value,
  onChange,
  isFocused,
  setIsFocused,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (cancelVariant === "onFocus") {
      setIsFocused(false);
    }
  };

  const handleCancelClick = () => {
    if (onCancelClick) {
      onCancelClick();
    }
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleCancelMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const showCancel = cancelVariant === "persistent" || isFocused;

  return (
    <div className={cn("relative flex w-full items-center gap-2", className)}>
      <div className="-mr-2 min-w-0 flex-grow basis-0">
        <Input
          {...props}
          ref={inputRef}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          leftIcon={<SearchIcon className="fill-TertiaryText h-full w-full" />}
          placeholder="Search"
        />
      </div>
      <div
        className={cn(
          "flex-shrink-0 transition-all duration-300 ease-in-out",
          showCancel ? "w-[60px] opacity-100" : "w-0 opacity-0",
        )}
      >
        <button
          onClick={handleCancelClick}
          onMouseDown={handleCancelMouseDown}
          tabIndex={showCancel ? 0 : -1}
          className={cn(
            "text-PrimaryYellow hover:text-primaryHover m-0 ml-2 w-full cursor-pointer border-none bg-transparent p-0 text-center font-medium transition-colors duration-200",
            !showCancel && "pointer-events-none",
          )}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
