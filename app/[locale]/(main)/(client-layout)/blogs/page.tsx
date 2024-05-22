import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { BlogList } from '@/components/blogs/list/BlogList';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { IBaseDropdown, IBaseResponse } from '@/types';
import { IBlog } from '@/types/blog';
import {
	AppConfig,
	ORIGIN_URL,
	SEARCH_CONTENT,
	SEARCH_DEPARTMENT,
	SEARCH_PAGE,
	SEARCH_SIZE,
	metaKeywords,
} from '@/utils/config';
import { fetchGetData, fetchSearchData } from '@/utils/services/base.service';

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
		namespace: 'blogs',
	});

	let blogs: IBaseResponse<IBlog[]> = await fetchSearchData('/blogs/search', {
		page_index: 1,
		page_size: 1,
	});

	if (blogs.message && !blogs.success) return notFound();

	const data = blogs?.data?.[0];

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
		keywords: ['tin tức aia', ...metaKeywords],
		openGraph: {
			title: `${t('meta_title')} | ${AppConfig.name}`,
			description: `${t('meta_description')}`,
			url: `${ORIGIN_URL}/blogs`,
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

export default async function BlogListPage({ searchParams }: Props) {
	let blogs: IBaseResponse<IBlog[]> = await fetchSearchData('/blogs/search', {
		page_index: searchParams[SEARCH_PAGE] || 1,
		page_size: searchParams[SEARCH_SIZE] || 6,
		search_content: searchParams[SEARCH_CONTENT],
		topic_id: searchParams[SEARCH_DEPARTMENT] || null,
	});

	let options: IBaseDropdown = await fetchGetData(`/research-types/dropdown`);

	if (options.message && !options.success) options = [];

	if (blogs.message && !blogs.success) return notFound();

	return (
		<>
			<Breadcrumb />
			<BlogList options={options} data={blogs} />
		</>
	);
}
