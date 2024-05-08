import { ProductList } from '@/components/product/ProductList';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { AppConfig } from '@/utils/config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'product',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
		openGraph: {
			title: `${t('meta_title')} | ${AppConfig.name}`,
			description: `${t('meta_description')}`,
			url: 'https://aiacademy-dev.edu.vn/product',
			siteName: AppConfig.name,
			images: [
				{
					url: '/api/file/' + btoa('2024-05-08/how-its-work.png'),
					width: 1800,
					height: 1600,
					alt: 'My custom alt',
				},
			],
			locale: props.params.locale,
			type: 'website',
		},
	};
}

export default function ProductPage() {
	return (
		<>
			<Breadcrumb />
			<ProductList />
		</>
	);
}
