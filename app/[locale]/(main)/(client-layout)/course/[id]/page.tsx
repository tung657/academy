import { CourseDetail } from '@/components/course/CourseDetail';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { apiClient } from '@/helpers';
import { ICourse } from '@/types/course';
import {
	AppConfig,
	BASE_URL,
	ERROR_TIMEOUT,
	ORIGIN_URL,
	metaKeywords,
} from '@/utils/config';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		locale: string;
		id: string;
	};
}
export async function generateMetadata({ params }: Props) {
	// Cannot fetch api from localhost with production
	// Cannot resolve
	let data = (
		await apiClient.get(`/courses/get-by-id/${params.id}`, {
			baseURL: `${ORIGIN_URL}${BASE_URL}`,
		})
	).data as ICourse;

	// DB sometimes returns error
	while (data.message === ERROR_TIMEOUT && !data.success) {
		data = (
			await apiClient.get(`/courses/get-by-id/${params.id}`, {
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
			})
		).data as ICourse;
	}
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
	let data = (
		await apiClient.get(`/courses/get-by-id/${params.id}`, {
			baseURL: `${ORIGIN_URL}${BASE_URL}`,
		})
	).data as ICourse;

	// DB sometimes returns error
	while (data.message === ERROR_TIMEOUT && !data.success) {
		data = (
			await apiClient.get(`/courses/get-by-id/${params.id}`, {
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
			})
		).data as ICourse;
	}
	if (data.message && !data.success) return notFound();

	return (
		<>
			<Breadcrumb lastLabel={data?.course_name} />
			<CourseDetail data={data} />
		</>
	);
}
