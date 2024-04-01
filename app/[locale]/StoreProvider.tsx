'use client';

import { RecoilRoot } from 'recoil';

interface Props {
	children: React.ReactNode;
}

export default function StoreProvider({ children }: Props) {
	return <RecoilRoot>{children}</RecoilRoot>;
}
