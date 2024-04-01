import { ClientLayout } from '@/components';
import { AppConfig } from '@/utils';
import { Container } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

interface Props {
	children: React.ReactNode;
}

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'home',
	});

	return {
		title: `${t('title')} | ${AppConfig.name}`,
	};
}

export default function Layout({ children }: Props) {
	return (
		<ClientLayout>
			<Container size="xl">{children}</Container>
		</ClientLayout>
	);
}
