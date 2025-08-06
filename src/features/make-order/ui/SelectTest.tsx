import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { cn } from "@/shared/lib/cn";

const CustomSelect = ({
  children,
  value,
  setValue,
}: {
  children: React.ReactNode;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <Select.Root value={value} onValueChange={(value) => setValue(value)}>
    <Select.Trigger className="inline-flex h-[35px] cursor-pointer items-center justify-center gap-[5px] rounded bg-transparent px-[15px] text-[13px] leading-none outline-none">
      <Select.Value />
      <Select.Icon className="translate-y-[10%]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="bn-svg"
        >
          <path
            d="M16.5 8.49v2.25L12 15.51l-4.5-4.77V8.49h9z"
            fill="var(--color-iconNormal)"
          ></path>
        </svg>
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content
        position="popper"
        align="end"
        side="bottom"
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out z-10 overflow-hidden rounded-md bg-[#1E2329] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] duration-200"
      >
        <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="py-2">{children}</Select.Viewport>
        <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={cn(
        "data-[state=checked]:bg-Input relative flex cursor-pointer items-center rounded-[3px] px-2.5 py-3 pr-10 text-[14px] leading-none font-medium select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-full inline-flex w-[20px] translate-x-[-135%] items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="css-qegglo"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.035 16.812l-.001.002 2.121 2.121.002-.002 2.121-2.12 9.19-9.192-2.12-2.121-9.191 9.19-3.536-3.534-2.121 2.12 3.535 3.536z"
            fill="currentColor"
          ></path>
        </svg>
      </Select.ItemIndicator>
    </Select.Item>
  );
});
SelectItem.displayName = "SelectItem";

export default CustomSelect;
