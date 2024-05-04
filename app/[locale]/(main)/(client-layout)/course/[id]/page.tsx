import { CourseDetail } from '@/components/course/CourseDetail';
import { dataCourses } from '@/components/course/data/data-fake';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { AppConfig } from '@/utils/config';
import { getTranslations } from 'next-intl/server';

interface Props {
	params: {
		locale: string;
		id: string;
	};
}

export async function generateMetadata({ params }: Props) {
	const t = await getTranslations('product');

	// Cannot fetch api from localhost with production
	// Cannot resolve
	await fetch('https://jsonplaceholder.typicode.com/todos');
	const title = dataCourses?.find((c) => c.id === Number(params?.id))?.title;

	return {
		title: `${title} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default async function CourseDetailPage({ params }: Props) {
	const course = dataCourses?.find((c) => c.id === Number(params?.id));

	return (
		<>
			<Breadcrumb lastLabel={course?.title} />
			<CourseDetail props={course} />
		</>
	);
}
