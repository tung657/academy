import Loading from '@/app/loading';
import AdminLayout from '@/components/layouts/AdminLayout';
import { AppConfig } from '@/utils/config';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import 'rc-tree/assets/index.css';
import '@mantine/dropzone/styles.css';

interface Props {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}

export async function generateMetadata(props: Props) {
	const t = await getTranslations({
		locale: props?.params?.locale,
		namespace: 'home',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default function Layout({ children, params }: Props) {
	return (
		<AdminLayout params={params}>
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</AdminLayout>
	);
}
