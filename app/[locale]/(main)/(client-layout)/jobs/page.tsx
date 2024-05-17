import { getTranslations } from 'next-intl/server';
import {
	AppConfig,
	BASE_URL,
	ERROR_TIMEOUT,
	ORIGIN_URL,
	metaKeywords,
} from '@/utils/config';
import { JobList } from '@/components/job/JobList';
import { IBaseResponse } from '@/types';
import { IJob } from '@/types/job';
import { apiClient } from '@/helpers';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'jobs',
	});

	let jobs: IBaseResponse<IJob[]> = (
		await apiClient.post(
			`/jobs/search`,
			{ active_flag: 1 },
			{
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
			},
		)
	).data as IBaseResponse<IJob[]>;

	// DB sometimes returns error
	while (jobs.message === ERROR_TIMEOUT && !jobs.success) {
		jobs = (
			await apiClient.post(
				`/jobs/search`,
				{ active_flag: 1 },
				{
					baseURL: `${ORIGIN_URL}${BASE_URL}`,
				},
			)
		).data as IBaseResponse<IJob[]>;
	}
	if (jobs.message && !jobs.success) return notFound();

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
		keywords: ['tuyển dụng aia', ...metaKeywords],
		openGraph: {
			title: `${t('meta_title')} | ${AppConfig.name}`,
			description: `${t('meta_description')}`,
			url: `${ORIGIN_URL}/course`,
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
	let jobs: IBaseResponse<IJob[]> = (
		await apiClient.post(
			`/jobs/search`,
			{ active_flag: 1 },
			{
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
			},
		)
	).data as IBaseResponse<IJob[]>;

	// DB sometimes returns error
	while (jobs.message === ERROR_TIMEOUT && !jobs.success) {
		jobs = (
			await apiClient.post(
				`/jobs/search`,
				{ active_flag: 1 },
				{
					baseURL: `${ORIGIN_URL}${BASE_URL}`,
				},
			)
		).data as IBaseResponse<IJob[]>;
	}
	if (jobs.message && !jobs.success) return notFound();

	return (
		<>
			<JobList data={jobs} />
		</>
	);
}
