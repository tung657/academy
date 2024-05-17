import { getTranslations } from 'next-intl/server';
import { AppConfig } from '@/utils/config';
import { BlogDetail } from '@/components/blogs/detail/BlogDetail';

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

export default async function BlogDetailPage() {
	return (
		<>
			<BlogDetail dataDetail={{}} />
		</>
	);
}
