import { notFound } from 'next/navigation';

import { CourseDetail } from '@/components/course/CourseDetail';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { ICourse } from '@/types/course';
import { AppConfig, ORIGIN_URL, metaKeywords } from '@/utils/config';
import { fetchGetData } from '@/utils/services/base.service';

interface Props {
	params: {
		locale: string;
		id: string;
	};
}
export async function generateMetadata({ params }: Props) {
	// Cannot fetch api from localhost with production
	// Cannot resolve
	let data: ICourse = await fetchGetData(`/courses/get-by-id/${params.id}`);

	if (data.message && !data.success) return notFound();

	// if (!data || data.message) return notFound();
	const title = `${data.course_name}`;

	return {
		title: `${title} | ${AppConfig.name}`,
		description: data.description,
		keywords: [data.course_name, ...metaKeywords],
		openGraph: {
			title: `${title} | ${AppConfig.name}`,
			description: data.description,
			url: `${ORIGIN_URL}/course/` + +params.id,
			siteName: AppConfig.name,
			images: [
				{
					url: '/assets/images/product/product.png',
					width: 1800,
					height: 1600,
					alt: `${title} | ${AppConfig.name}`,
				},
				{
					url: data.thumbnail,
					width: 1800,
					height: 1600,
					alt: `${title} | ${AppConfig.name}`,
				},
			],
			locale: params.locale,
			type: 'website',
		},
	};
}

export default async function CourseDetailPage({ params }: Props) {
	let data: ICourse = await fetchGetData(`/courses/get-by-id/${params.id}`);

	if (data.message && !data.success) return notFound();

	return (
		<>
			<Breadcrumb lastLabel={data?.course_name} />
			<CourseDetail data={data} />
		</>
	);
}
