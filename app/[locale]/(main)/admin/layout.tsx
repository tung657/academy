import Loading from '@/app/loading';
import AdminLayout from '@/components/layouts/AdminLayout';
import { AppConfig } from '@/utils/config';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import 'rc-tree/assets/index.css';
import '@mantine/dropzone/styles.css';
import { IBasePage } from '@/types';

export async function generateMetadata(props: IBasePage) {
	const t = await getTranslations({
		locale: props?.params?.locale,
		namespace: 'home',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default function Layout({ children, params }: IBasePage) {
	return (
		<AdminLayout params={params}>
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</AdminLayout>
	);
}
