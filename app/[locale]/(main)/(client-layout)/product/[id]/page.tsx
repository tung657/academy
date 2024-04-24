import { ProductDetail } from '@/components/product/ProductDetail';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { AppConfig } from '@/utils/config';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

export async function generateMetadata() {
	const t = await getTranslations('product');

	// Cannot fetch api from localhost with production
	// Cannot resolve
	await fetch('https://jsonplaceholder.typicode.com/todos');
	const title = 'Product Details';

	return {
		title: `${title} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default async function ProductDetailPage() {
	const title = 'Product Details';

	return (
		<>
			<Breadcrumb lastLabel={title} />
			<Suspense>
				<ProductDetail />
			</Suspense>
		</>
	);
}
