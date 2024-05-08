import { ProductDetail } from '@/components/product/ProductDetail';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { getProductById } from '@/helpers/repositories/product.repository';
import { IProduct } from '@/types';
import { AppConfig } from '@/utils/config';
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
	const data = await getProductById(+params.id);
	if (!data) return notFound();
	const title = `${data.product_name}`;

	return {
		title: `${title} | ${AppConfig.name}`,
		description: data.description,
		openGraph: {
			title: `${title} | ${AppConfig.name}`,
			description: data.description,
			url: 'https://web-dev.aiacademy.edu.vn/product/' + +params.id,
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
	const data = (await getProductById(+params.id)) as IProduct;

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
