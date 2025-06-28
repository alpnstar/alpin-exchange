'use client';
import React, {FC} from 'react';
import {Logo} from '@/shared/ui/logo';
import {BurgerSvg, FaqSvg, ParamsSvg} from '@/shared/ui/icon';
import {BurgerMenu} from '@/widgets/header/ui/BurgerMenu';
import {ToSignUpButton} from '@/features/registration';
import {SearchMobile} from '@/features/search-coin';
import {ToSignInButton} from '@/features/login';
import {Popup} from '@/shared/ui/popup';
import {SearchDesktop} from '@/features/search-coin/ui/SearchDesktop';


export const Header: FC = ({}) => {
	return (
		<div className="w-full bg-bg1 px-6 py-4">
			<div className=" mx-auto flex justify-between items-center">
				<div className="flex items-center gap-4">
					<Logo/>
					<nav className="hidden lg:block ">
						<ul className="flex gap-5 items-baseline font-medium">
							<li><a href="#" className="text-PrimaryText hover:text-PrimaryYellow">Buy Crypto</a></li>
							<li><a href="#" className="text-PrimaryText hover:text-PrimaryYellow">Markets</a></li>
							<li><a href="#" className="text-PrimaryText hover:text-PrimaryYellow">Trade</a></li>
							<li><a href="#" className="text-PrimaryText hover:text-PrimaryYellow">Futures</a></li>
							<li><a href="#" className="text-PrimaryText hover:text-PrimaryYellow">Earn</a></li>
							<li><a href="#" className="text-PrimaryText hover:text-PrimaryYellow">Square</a></li>
							<li><a href="#" className="text-PrimaryText hover:text-PrimaryYellow">More</a></li>
						</ul>
					</nav>
				</div>
				<div className="flex items-center  gap-4 ">
				<SearchDesktop/>
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
						<SearchMobile/>
					</BurgerMenu>
					<div className="gap-3 items-center flex">
						<button className="hidden xl:block" aria-label="FAQ">
							<svg className="fill-PrimaryText w-6 h-6 hover:fill-PrimaryYellow" viewBox="0 0 24 24"
							     xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd"
								      d="M15.23 20.403a9.011 9.011 0 005.684-7.153h-3.942c-.147 2.86-.793 5.388-1.741 7.153zm-.757-7.153c-.178 4.102-1.217 7.25-2.473 7.25-1.256 0-2.295-3.148-2.473-7.25h4.946zm0-2.5H9.527C9.705 6.648 10.744 3.5 12 3.5c1.256 0 2.295 3.148 2.473 7.25zm2.499 0h3.942a9.01 9.01 0 00-5.683-7.153c.948 1.765 1.594 4.293 1.741 7.153zm-9.936 0c.147-2.862.793-5.392 1.743-7.156a9.01 9.01 0 00-5.693 7.156h3.95zm0 2.5h-3.95a9.01 9.01 0 005.693 7.157c-.95-1.765-1.596-4.295-1.743-7.157z"
								></path>
							</svg>
						</button>
						<button className="hidden md:block" aria-label="FAQ">
							<FaqSvg/>
						</button>
						<button aria-label="Parameters">
							<ParamsSvg/>
						</button>
						<button className="hidden xl:block" aria-label="FAQ">
							<svg className="w-6 h-6 cursor-pointer fill-PrimaryText hover:fill-PrimaryYellow"
							     viewBox="0 0 24 24"
							     xmlns="http://www.w3.org/2000/svg">
								<path d="M20 12.67A6.233 6.233 0 0111.33 4 8.015 8.015 0 1020 12.67z"
								></path>
							</svg>
						</button>
					</div>
				</div>

			</div>

		</div>
	);
};