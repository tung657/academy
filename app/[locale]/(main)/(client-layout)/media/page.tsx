import { Media } from '@/components/media/Media';
import { getTranslations } from 'next-intl/server';
import { AppConfig } from '@/utils';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'media',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default async function MediaPage() {
	return (
		<>
			<Breadcrumb />
			<Media></Media>
		</>
	);
}
