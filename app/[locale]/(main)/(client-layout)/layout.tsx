import { Notifications } from '@mantine/notifications';

import { ClientLayout } from '@/components';

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<ClientLayout>
			{children}
			<Notifications position="top-right" zIndex={2000} />
		</ClientLayout>
	);
}
