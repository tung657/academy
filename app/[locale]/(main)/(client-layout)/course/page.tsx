import { CourseList } from '@/components/course/CourseList';
import { getTranslations } from 'next-intl/server';
import { AppConfig } from '@/utils/config';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

interface Props {
	params: {
		locale: string;
		id: string;
	};
}

export async function generateMetadata(props: Props) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'course',
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
			<CourseList />
		</>
	);
}
