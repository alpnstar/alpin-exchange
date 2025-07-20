import React, { FC } from "react";
import * as TabsRadix from "@radix-ui/react-tabs";
import { cn } from "@/shared/lib/cn";

export const TabsTrigger = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <TabsRadix.Trigger
    value={value}
    className={cn(
      "relative h-[38px]",
      "cursor-pointer",
      "text-TertiaryText",
      "data-[state=active]:text-textWhite",
      ":after:block after:bg-PrimaryYellow transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-[16px] after:-translate-x-1/2 after:opacity-0 after:duration-300 after:content-['']",
      "data-[state=active]:after:opacity-100",
      className,
    )}
  >
    {children}
  </TabsRadix.Trigger>
);

export const TabsList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <TabsRadix.List
    className={cn("flex gap-6 border-b border-gray-800", className)}
  >
    {children}
  </TabsRadix.List>
);
export const TabsContent = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <TabsRadix.Content className={cn("grow", className)} value={value}>
    {children}
  </TabsRadix.Content>
);

export const Tabs: FC<{
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
}> = ({ children, defaultValue = "", className }) => {
  return (
    <div className={cn(className)}>
      <TabsRadix.Root
        defaultValue={defaultValue}
        className="flex h-full w-full flex-col font-medium"
      >
        {children}
      </TabsRadix.Root>
    </div>
  );
};
