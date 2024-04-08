import { ProductList } from '@/components/product/ProductList';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { AppConfig } from '@/utils';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'about',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default function AboutPage() {
	return (
		<>
			<Breadcrumb />
			<ProductList />
		</>
	);
}