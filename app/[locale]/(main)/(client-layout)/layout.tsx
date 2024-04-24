import { ClientLayout } from '@/components';
import { AppConfig } from '@/utils/config';
import { getTranslations } from 'next-intl/server';
import { Notifications } from '@mantine/notifications';

interface Props {
	children: React.ReactNode;
}

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'home',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default function Layout({ children }: Props) {
	return (
		<ClientLayout>
			{children}
			<Notifications />
		</ClientLayout>
	);
}
