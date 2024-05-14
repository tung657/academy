import { CourseList } from '@/components/course/CourseList';
import { getTranslations } from 'next-intl/server';
import {
	AppConfig,
	BASE_URL,
	ERROR_TIMEOUT,
	ORIGIN_URL,
	SEARCH_CONTENT,
	SEARCH_PAGE,
	SEARCH_SIZE,
	metaKeywords,
} from '@/utils/config';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { IBaseResponse } from '@/types';
import { ICourse } from '@/types/course';
import { apiClient } from '@/helpers';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		locale: string;
		id: string;
	};
	searchParams: any;
}

export async function generateMetadata(props: Props) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'courses',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
		keywords: ['đào tạo aia', ...metaKeywords],
		openGraph: {
			title: `${t('meta_title')} | ${AppConfig.name}`,
			description: `${t('meta_description')}`,
			url: `${ORIGIN_URL}/product`,
			siteName: AppConfig.name,
			images: [
				{
					url: '/assets/images/product/product.png',
					width: 1800,
					height: 1600,
					alt: `${t('meta_title')} | ${AppConfig.name}`,
				},
			],
			locale: props.params.locale,
			type: 'website',
		},
	};
}

export default async function Course({ searchParams }: Props) {
	let courses: IBaseResponse<ICourse[]> = (
		await apiClient.post(
			`/courses/search`,
			{
				page_index: searchParams[SEARCH_PAGE] || 1,
				page_size: searchParams[SEARCH_SIZE] || 6,
				search_content: searchParams[SEARCH_CONTENT],
			},
			{
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
			},
		)
	).data as IBaseResponse<ICourse[]>;

	// DB sometimes returns error
	while (courses.message === ERROR_TIMEOUT && !courses.success) {
		courses = (
			await apiClient.post(
				`/courses/search`,
				{
					page_index: searchParams[SEARCH_PAGE] || 1,
					page_size: searchParams[SEARCH_SIZE] || 6,
					search_content: searchParams[SEARCH_CONTENT],
				},
				{
					baseURL: `${ORIGIN_URL}${BASE_URL}`,
				},
			)
		).data as IBaseResponse<ICourse[]>;
	}

	if (courses.message && !courses.success) return notFound();

	return (
		<>
			<Breadcrumb />
			<CourseList data={courses} />
		</>
	);
}
