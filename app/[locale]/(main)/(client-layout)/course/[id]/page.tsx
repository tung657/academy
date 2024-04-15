import Loading from '@/app/loading';
import { CourseDetail } from '@/components/course/CourseDetail';
import { dataCourses } from '@/components/course/data/data-fake';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { AppConfig } from '@/utils';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

export async function generateMetadata({ params }: { params: { id: string } }) {
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

export default async function CourseDetailPage() {
	const title = 'Grid Details';

	return (
		<>
			<Breadcrumb lastLabel={title} />
			<Suspense fallback={<Loading />}>
				<CourseDetail />
			</Suspense>
		</>
	);
}
