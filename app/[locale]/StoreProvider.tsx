'use client';

import { queryClient } from '@/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

interface Props {
	children: React.ReactNode;
}

export default function StoreProvider({ children }: Props) {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</RecoilRoot>
	);
}
