import { ClientLayout } from '@/components';
import { Notifications } from '@mantine/notifications';

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<ClientLayout>
			{children}
			<Notifications zIndex={2000} />
		</ClientLayout>
	);
}
