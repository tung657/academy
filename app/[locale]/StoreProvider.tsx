'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';

interface Props {
	children: React.ReactNode;
}

export default function StoreProvider({ children }: Props) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// With SSR, we usually want to set some default staleTime
						// above 0 to avoid refetching immediately on the client
						staleTime: 60 * 1000,
					},
				},
			}),
	);

	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</RecoilRoot>
	);
}
