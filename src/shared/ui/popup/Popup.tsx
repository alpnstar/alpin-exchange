import React from 'react';
import {Popover} from 'radix-ui';
import {cn} from '@/shared/lib/cn';

interface IPopupProps {
	children?: React.ReactNode,
	trigger?: React.ReactNode,
	open?: boolean,
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
	className?: string,
}
export const Popup: React.FC<IPopupProps> = ({children, open, setOpen, trigger, className}) => (
	<Popover.Root open={open} onOpenChange={setOpen}>
		<Popover.Trigger>
			{trigger}
		</Popover.Trigger>
		<Popover.Portal>
			<Popover.Content
				className= {cn("w-100 rounded-md bg-popupBg p-5 animate-in fade-in duration-[300ms]", className)}
				sideOffset={5}
			>
				{children}
			</Popover.Content>
		</Popover.Portal>
	</Popover.Root>
);

export default Popup;
