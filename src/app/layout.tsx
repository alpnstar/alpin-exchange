import type {Metadata} from 'next';
import {Header} from '@/widgets/header';
import './globals.css';

export const metadata: Metadata = {
	title: 'Alpin Exchange',
	description: 'Alpin Exchange — проект, представляющий собой упрощенный клон криптобиржи Binance. Реализован базовый функционал: спотовая торговля, книга ордеров, пользовательский кошелек и история сделок.'
};

export default function RootLayout({
	                                   children
                                   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
		<body className="bg-black text-PrimaryText">
		<Header/>
		{children}
		</body>
		</html>

	);
}
