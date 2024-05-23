import { notFound } from 'next/navigation';

import { ProductDetail } from '@/components/product/ProductDetail';
import { IProduct } from '@/types';
import { AppConfig, ORIGIN_URL, metaKeywords } from '@/utils/config';
import { fetchGetData } from '@/utils/services/base.service';

interface Props {
	params: {
		locale: string;
		id: string;
	};
}

export async function generateMetadata({ params }: Props) {
	// Cannot fetch api from localhost with production
	// Cannot resolve
	let data: IProduct = await fetchGetData(`/products/get-by-id/${params.id}`, {
		isClient: true,
	});

	if (data.message && !data.success) return notFound();

	// if (!data || data.message) return notFound();
	const title = `${data.product_name}`;

	return {
		title: `${title} | ${AppConfig.name}`,
		description: data.description,
		keywords: [data.product_name, ...metaKeywords],
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
	let data: IProduct = await fetchGetData(`/products/get-by-id/${params.id}`, {
		isClient: true,
	});

	if (data.message && !data.success) return notFound();

	return (
		<>
			<ProductDetail
				dataDetail={data?.message ? undefined : data ? data : undefined}
				locale={params.locale}
			/>
		</>
	);
}
