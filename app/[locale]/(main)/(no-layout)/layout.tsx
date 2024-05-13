import { Notifications } from '@mantine/notifications';

interface Props {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}
export default function Layout({ children }: Props) {
	return (
		<>
			{children}
			<Notifications position="top-right" zIndex={10000} />
		</>
	);
}
