import { CourseGrid } from '@/components/course/CourseGird';
import { getTranslations } from 'next-intl/server';
import { AppConfig } from '@/utils';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'about-us',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default function Course() {
	return (
		<>
			<Breadcrumb />
			<CourseGrid></CourseGrid>
		</>
	);
}
