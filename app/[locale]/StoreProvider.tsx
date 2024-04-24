'use client';

import { queryClient } from '@/utils/query-loader/react-query';
import { DatesProvider } from '@mantine/dates';
import { QueryClientProvider } from '@tanstack/react-query';
import 'dayjs/locale/vi';
import { RecoilRoot } from 'recoil';

interface Props {
	children: React.ReactNode;
}

export default function StoreProvider({ children }: Props) {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<DatesProvider settings={{ locale: 'vi' }}>{children}</DatesProvider>
			</QueryClientProvider>
		</RecoilRoot>
	);
}
