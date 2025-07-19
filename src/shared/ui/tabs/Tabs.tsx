import React, {FC} from 'react';
import * as TabsRadix from '@radix-ui/react-tabs';
import {cn} from '@/shared/lib/cn';


export const TabsTrigger = ({value, children, className}: {
	value: string;
	children: React.ReactNode,
	className?: string
}) => (
	<TabsRadix.Trigger
		value={value}
		className={cn(
			'relative h-[38px]',
			'text-TertiaryText',
			'data-[state=active]:text-textWhite',
			':after:block after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-[16px] after:-translate-x-1/2 after:bg-PrimaryYellow after:opacity-0 transition-all duration-300 after:duration-300 after:content-[\'\']',
			' data-[state=active]:after:opacity-100',
			className
		)}
	>
		{children}
	</TabsRadix.Trigger>
);

export const TabsList = ({children, className}: { children: React.ReactNode, className?: string }) => (
	<TabsRadix.List className={cn('flex gap-6 border-b border-gray-800 px-4 ', className)}>
		{children}
	</TabsRadix.List>

);
export const TabsContent = ({value, children, className}: {
	value: string;
	children: React.ReactNode,
	className?: string
}) => (
	<TabsRadix.Content className={cn('grow', className)} value={value}>
		{children}
	</TabsRadix.Content>


);

export const Tabs: FC<{
	children: React.ReactNode,
	defaultValue?: string,
	className?: string
}> = ({children, defaultValue = '', className}) => {

	return (
		<div
			className={cn('rounded-md bg-bg md:row-start-2 md:col-start-2 md:col-end-3 lg:col-start-2 lg:col-end-3', className)}>
			<TabsRadix.Root defaultValue={defaultValue} className="flex h-full w-full flex-col font-medium">
				{children}
			</TabsRadix.Root>
		</div>
	);
};