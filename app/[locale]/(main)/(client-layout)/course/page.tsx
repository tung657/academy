import { CourseList } from '@/components/course/CourseList';
import { getTranslations } from 'next-intl/server';
import {
	AppConfig,
	ORIGIN_URL,
	SEARCH_CONTENT,
	SEARCH_PAGE,
	SEARCH_SIZE,
	metaKeywords,
} from '@/utils/config';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { IBaseResponse } from '@/types';
import { ICourse } from '@/types/course';
import { notFound } from 'next/navigation';
import { fetchSearchData } from '@/utils/services/base.service';

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

	let courses: IBaseResponse<ICourse[]> = await fetchSearchData(
		'/courses/search',
		{
			page_index: 1,
			page_size: 1,
		},
	);

	if (courses.message && !courses.success) return notFound();

	const data = courses?.data?.[0];

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
		keywords: ['đào tạo aia', ...metaKeywords],
		openGraph: {
			title: `${t('meta_title')} | ${AppConfig.name}`,
			description: `${t('meta_description')}`,
			url: `${ORIGIN_URL}/course`,
			siteName: AppConfig.name,
			images: [
				{
					url: data?.thumbnail,
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
	let courses: IBaseResponse<ICourse[]> = await fetchSearchData(
		'/courses/search',
		{
			page_index: searchParams[SEARCH_PAGE] || 1,
			page_size: searchParams[SEARCH_SIZE] || 6,
			search_content: searchParams[SEARCH_CONTENT],
		},
	);

	console.log(courses.message);

	if (courses.message && !courses.success) return notFound();

	return (
		<>
			<Breadcrumb />
			<CourseList data={courses} />
		</>
	);
}
