import { ProductList } from '@/components/product/ProductList';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { searchProduct } from '@/helpers/repositories/product.repository';
import { IProduct } from '@/types';
import { AppConfig } from '@/utils/config';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		locale: string;
		id: string;
	};
}

export async function generateMetadata(props: Props) {
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
			url: 'https://web-dev.aiacademy.edu.vn/product',
			siteName: AppConfig.name,
			images: [
				{
					url: '/assets/images/product/product.png',
					width: 1800,
					height: 1600,
					alt: `${t('meta_title')} | ${AppConfig.name}`,
				},
			],
			locale: props.params.locale,
			type: 'website',
		},
	};
}

export default async function ProductPage() {
	const products = (await searchProduct({})) as IProduct[];

	if (!products) return notFound();

	return (
		<>
			<Breadcrumb />
			<ProductList data={products} />
		</>
	);
}
