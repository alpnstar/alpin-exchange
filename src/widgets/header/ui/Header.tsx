'use client';
import React, {FC} from 'react';
import {Logo} from '@/shared/ui/logo';
import {BurgerSvg, ParamsSvg, SearchIcon, SettingsSvg} from '@/shared/ui/icon';
import {BurgerMenu} from '@/widgets/header/ui/BurgerMenu';
import {ToSignUpButton} from '@/features/registration';
import {Button} from '@/shared/ui/button';
import {SearchCoin} from '@/features/search-coin';
import {ToSignInButton} from '@/features/login';


export const Header: FC = ({}) => {
	return (
		<div className="w-full bg-bg1 px-4 py-5">
			<div className=" mx-auto flex justify-between items-center">
				<Logo/>
				<div className="flex items-center  gap-3 ">
					<SearchIcon
						className="hidden md:block cursor-pointer fill-PrimaryText w-6 h-6 hover:fill-PrimaryYellow" aria-label="Search"/>
					<div className="flex gap-3">
						<ToSignInButton className={'px-3 hidden md:block'}/>
						<ToSignUpButton className={'px-3'}/>
					</div>

					<BurgerMenu trigger={<div className="md:hidden"><BurgerSvg/></div>}>
						<div>
							<div className="flex gap-4 items-baseline">
								<ToSignInButton width="w-full" className="w-full py-3"/>
								<ToSignUpButton width="w-full" className="w-full py-3"/>
							</div>

						</div>
						<SearchCoin/>
					</BurgerMenu>
					<button className="hidden md:block" aria-label="Settings">
						<SettingsSvg />
					</button>
					<button aria-label="Parameters">
						<ParamsSvg/>
					</button>
				</div>

			</div>

		</div>
	);
};