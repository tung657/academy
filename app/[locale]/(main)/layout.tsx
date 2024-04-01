'use client';

import { useEffect, useState } from 'react';

// ? Store
import StoreProvider from '@/app/[locale]/StoreProvider';

// ? Conponents

interface Props {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}

export default function Layout({ children }: Props) {
	//? Fix Hydration failed
	const [showChild, setShowChild] = useState(false);
	useEffect(() => {
		setShowChild(true);
	}, []);

	if (!showChild) {
		return null;
	}

	return <StoreProvider>{children}</StoreProvider>;
}
