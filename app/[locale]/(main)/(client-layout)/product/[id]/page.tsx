import { ProductDetail } from '@/components/product/ProductDetail';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { AppConfig, getSlideById } from '@/utils';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
	const t = await getTranslations('product');
	await getSlideById(1);

	const title = 'Product Details';

	return {
		title: `${title} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default async function ProductDetailPage({
	params,
}: {
	params: { id: string };
}) {
	await getSlideById(params.id);

	const title = 'Product Details';

	return (
		<>
			<Breadcrumb lastLabel={title} />
			<ProductDetail />
		</>
	);
}
