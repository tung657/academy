import { ProductList } from '@/components/product/ProductList';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { IBaseResponse, IProduct } from '@/types';
import { AppConfig, ORIGIN_URL, metaKeywords } from '@/utils/config';
import { fetchSearchData } from '@/utils/services/base.service';
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

	let products: IBaseResponse<IProduct[]> = await fetchSearchData(
		'/products/search',
		{ page_size: 1, page_index: 1 },
	);

	if (products.message && !products.success) return notFound();

	const data = products?.data?.[0];

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
					url: data?.thumbnail,
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
	let products: IBaseResponse<IProduct[]> =
		await fetchSearchData('/products/search');

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
