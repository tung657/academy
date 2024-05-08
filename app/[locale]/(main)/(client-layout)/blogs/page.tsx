import { Blog } from '@/components/blogs/list/Blog';
import { getTranslations } from 'next-intl/server';
import { AppConfig } from '@/utils/config';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'blogs',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default async function BlogPage() {
	return (
		<>
			<Breadcrumb />
			<Blog />
		</>
	);
}
