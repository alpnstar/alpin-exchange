import React, {ButtonHTMLAttributes, FC} from 'react';
import {cva, VariantProps} from 'class-variance-authority';
import {cn} from '@/shared/lib/cn';


const buttonVariants = cva(
	'px-2.5 pt-1.5 pb-2 cursor-pointer rounded-sm font-medium text-[15px] leading-none  hover:opacity-85',

	{
		variants: {
			variant: {
				primary: 'bg-BtnBg text-TextOnYellow',
				secondary: 'bg-Line text-PrimaryText'
			},
		},

		defaultVariants: {
			variant: 'primary',
		}
	}
);

 interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
}

export const Button: FC<ButtonProps> = ({variant, className, children}) => {
	return (
		<button
		        className={cn(buttonVariants({variant, className}))}>
			{children}
		</button>
	);
};