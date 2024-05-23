import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { JobList } from '@/components/job/JobList';
import { IBaseResponse } from '@/types';
import { IJob } from '@/types/job';
import { AppConfig, ORIGIN_URL, metaKeywords } from '@/utils/config';
import { fetchSearchData } from '@/utils/services/base.service';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'jobs',
	});

	let jobs: IBaseResponse<IJob[]> = await fetchSearchData('/jobs/search', {
		active_flag: 1,
		page_index: 1,
		page_size: 1,
	});

	if (jobs.message && !jobs.success) return notFound();

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
		keywords: ['tuyển dụng aia', ...metaKeywords],
		openGraph: {
			title: `${t('meta_title')} | ${AppConfig.name}`,
			description: `${t('meta_description')}`,
			url: `${ORIGIN_URL}/jobs`,
			siteName: AppConfig.name,
			images: [
				{
					url: jobs?.data?.[0]?.icon,
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

export default async function Job() {
	let jobs: IBaseResponse<IJob[]> = await fetchSearchData('/jobs/search', {
		active_flag: 1,
	});

	if (jobs.message && !jobs.success) return notFound();

	return (
		<>
			<JobList data={jobs} />
		</>
	);
}
