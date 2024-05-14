import { ProductList } from '@/components/product/ProductList';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { apiClient } from '@/helpers';
import { IBaseResponse, IProduct } from '@/types';
import {
	AppConfig,
	BASE_URL,
	ERROR_TIMEOUT,
	ORIGIN_URL,
	metaKeywords,
} from '@/utils/config';
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
		namespace: 'products',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
		keywords: ['sản phẩm aia', ...metaKeywords],
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
	let products: IBaseResponse<IProduct[]> = (
		await apiClient.post(
			`/products/search`,
			{},
			{
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
			},
		)
	).data as IBaseResponse<IProduct[]>;

	// DB sometimes returns error
	while (products.message === ERROR_TIMEOUT && !products.success) {
		products = (
			await apiClient.post(
				`/products/search`,
				{},
				{
					baseURL: `${ORIGIN_URL}${BASE_URL}`,
				},
			)
		).data as IBaseResponse<IProduct[]>;
	}
	if (products.message && !products.success) return notFound();

	return (
		<>
			<Breadcrumb />
			<ProductList
				data={products?.message ? [] : products.data ? products.data : []}
			/>
		</>
	);
}
