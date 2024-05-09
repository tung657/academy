import { ProductList } from '@/components/product/ProductList';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { apiClient } from '@/helpers';
import { IBaseResponse, IProduct } from '@/types';
import { AppConfig, BASE_URL, ORIGIN_URL } from '@/utils/config';
import { getTranslations } from 'next-intl/server';

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
			url: `${ORIGIN_URL}/product`,
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
	const products = (
		await apiClient.post(
			`/products/search`,
			{},
			{
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
			},
		)
	).data as IBaseResponse<IProduct[]>;

	// if (!products?.data || products.message) return notFound();

	return (
		<>
			<Breadcrumb />
			<ProductList
				data={products?.message ? [] : products.data ? products.data : []}
			/>
		</>
	);
}
