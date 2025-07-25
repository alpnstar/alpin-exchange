"use client";

import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const inputContainerVariants = cva(
  [
    "text-PrimaryText border-InputLine selection:bg-PrimaryYellow",
    "flex items-center w-full rounded-md border bg-transparent",
    "transition-colors duration-300 outline-none cursor-text",
    "focus-within:border-PrimaryYellow",
  ],
  {
    variants: {
      size: {
        sm: "min-h-8",
        md: "min-h-10",
        lg: "min-h-12",
      },
      disabled: {
        true: "pointer-events-none cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);

const inputElementVariants = cva(
  [
    "flex-1 bg-transparent outline-none border-none",
    "min-w-0",
    "placeholder:text-TertiaryText placeholder:font-medium placeholder:text-[13px] md:placeholder:text-[14px]",
    "caret-PrimaryYellow",
    "leading-normal",
  ],
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base md:text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "pointer-events-none cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);

const iconContainerVariants = cva("flex-shrink-0", {
  variants: {
    size: {
      sm: "mx-2",
      md: "mx-3",
      lg: "mx-4",
    },
    position: {
      left: "",
      right: "",
    },
  },
  defaultVariants: {
    size: "md",
    position: "left",
  },
});

type InputContainerVariants = VariantProps<typeof inputContainerVariants>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    Pick<InputContainerVariants, "size"> {
  containerClassName?: string;
  inputClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  htmlSize?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      className,
      containerClassName,
      inputClassName,
      size = "md",
      leftIcon,
      rightIcon,
      htmlSize,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      const input = e.currentTarget.querySelector("input");
      input?.focus();
    };

    return (
      <div
        className={cn(
          inputContainerVariants({
            size,
            disabled: disabled || false,
          }),
          containerClassName,
          className,
        )}
        onClick={handleContainerClick}
      >
        {leftIcon && (
          <div
            className={iconContainerVariants({
              size,
              position: "left",
            })}
          >
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          ref={ref}
          data-slot="input"
          disabled={disabled}
          size={htmlSize}
          className={cn(
            inputElementVariants({
              size,
              disabled: disabled || false,
            }),
            inputClassName,
          )}
          {...props}
        />

        {rightIcon && (
          <div
            className={iconContainerVariants({
              size,
              position: "right",
            })}
          >
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export {
  Input,
  inputContainerVariants,
  inputElementVariants,
  iconContainerVariants,
};
