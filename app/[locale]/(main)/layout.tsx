'use client';

import { useEffect, useState } from 'react';

// ? Store
import StoreProvider from '@/app/[locale]/StoreProvider';
import { IBasePage } from '@/types';

export default function Layout({ children }: IBasePage) {
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
