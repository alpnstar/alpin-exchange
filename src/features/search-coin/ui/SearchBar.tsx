import React, { FC, useState, useRef, useEffect } from "react";
import { Input, InputProps } from '@/shared/ui/input';
import { cn } from "@/shared/lib/cn";
import { SearchIcon } from "@/shared/ui/icon/ui/SearchIcon";

export interface SearchBarProps extends InputProps {
  cancelVariant?: 'onFocus' | 'persistent';
  onCancelClick?: () => void;
}

export const SearchBar: FC<SearchBarProps> = ({ className, cancelVariant = 'onFocus', onCancelClick, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (cancelVariant === 'onFocus') {
      blurTimeoutRef.current = setTimeout(() => {
        setIsFocused(false);
      }, 150);
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

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  const showCancel = cancelVariant === 'persistent' || isFocused;

  return (
    <div className={cn("flex items-center w-full gap-2", className)}>
      <div className="flex-grow min-w-0">
        <Input
          {...props}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          leftIcon={<SearchIcon className="fill-[#848E9C]" />}
          placeholder="Coin, Function, Announcement"
        />
      </div>
      <div className={cn(
        "transition-all duration-300 ease-in-out flex-shrink-0",
        showCancel ? "w-[60px] opacity-100" : "w-0 opacity-0"
      )}>
        <button
          onClick={handleCancelClick}
          onMouseDown={handleCancelMouseDown}
          tabIndex={showCancel ? 0 : -1}
          style={{ color: 'var(--color-PrimaryYellow)' }}
          className={cn(
            "bg-transparent border-none p-0 m-0 w-full text-center font-medium hover:text-yellow-400 transition-colors duration-200",
            !showCancel && "pointer-events-none"
          )}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};