import { CourseDetail } from '@/components/course/CourseDetail';
import { dataCourses } from '@/components/course/data/data-fake';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { IBasePage } from '@/types';
import { AppConfig } from '@/utils/config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: IBasePage) {
	const t = await getTranslations('product');

	// Cannot fetch api from localhost with production
	// Cannot resolve
	await fetch('https://jsonplaceholder.typicode.com/todos');
	const title = dataCourses?.find((c) => c.id === +params.id)?.title;

	return {
		title: `${title} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default async function CourseDetailPage({ params }: IBasePage) {
	const course = dataCourses?.find((c) => c.id === +params.id);

	return (
		<>
			<Breadcrumb lastLabel={course?.title} />
			<CourseDetail props={course} />
		</>
	);
}
