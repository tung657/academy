import Loading from '@/app/loading';
import AdminLayout from '@/components/layouts/AdminLayout';
import { AppConfig } from '@/utils/config';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import 'rc-tree/assets/index.css';

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
		<AdminLayout>
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</AdminLayout>
	);
}
