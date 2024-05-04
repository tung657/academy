'use client';

import { useEffect, useState } from 'react';

// ? Store
import StoreProvider from '@/app/[locale]/StoreProvider';

interface Props {
	children: React.ReactNode;
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
