import { ProductDetail } from '@/components/product/ProductDetail';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { apiClient } from '@/helpers';
import { IProduct } from '@/types';
import { AppConfig, BASE_URL, ORIGIN_URL } from '@/utils/config';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface Props {
	params: {
		locale: string;
		id: string;
	};
}

export async function generateMetadata({ params }: Props) {
	// Cannot fetch api from localhost with production
	// Cannot resolve
	const data = (await apiClient.get(`/products/get-by-id/${params.id}`, {
		baseURL: `${ORIGIN_URL}${BASE_URL}`,
	})) as IProduct;

	if (!data) return notFound();
	const title = `${data.product_name}`;

	return {
		title: `${title} | ${AppConfig.name}`,
		description: data.description,
		openGraph: {
			title: `${title} | ${AppConfig.name}`,
			description: data.description,
			url: `${ORIGIN_URL}/product/` + +params.id,
			siteName: AppConfig.name,
			images: [
				{
					url: '/assets/images/product/product.png',
					width: 1800,
					height: 1600,
					alt: `${title} | ${AppConfig.name}`,
				},
				{
					url: data.thumbnail,
					width: 1800,
					height: 1600,
					alt: `${title} | ${AppConfig.name}`,
				},
			],
			locale: params.locale,
			type: 'website',
		},
	};
}

export default async function ProductDetailPage({ params }: Props) {
	const data = (await apiClient.get(`/products/get-by-id/${params.id}`, {
		baseURL: `${ORIGIN_URL}${BASE_URL}`,
	})) as IProduct;

	if (!data) return notFound();

	const title = data.product_name;

	return (
		<>
			<Breadcrumb lastLabel={title} />
			<Suspense>
				<ProductDetail dataDetail={data} />
			</Suspense>
		</>
	);
}
