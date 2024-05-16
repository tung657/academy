import { ResearchList } from '@/components/research/ResearchList';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { apiClient } from '@/helpers';
import { IBaseResponse } from '@/types';
import { IResearchType } from '@/types/research-type';
import {
	AppConfig,
	BASE_URL,
	ERROR_TIMEOUT,
	ORIGIN_URL,
	metaKeywords,
} from '@/utils/config';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'researches',
	});

	let researches: IBaseResponse<IResearchType[]> = (
		await apiClient.post(
			`/research-types/search`,
			{ page_index: 1, page_size: 1 },
			{
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
			},
		)
	).data as IBaseResponse<IResearchType[]>;

	// DB sometimes returns error
	while (researches.message === ERROR_TIMEOUT && !researches.success) {
		researches = (
			await apiClient.post(
				`/research-types/search`,
				{ page_index: 1, page_size: 1 },
				{
					baseURL: `${ORIGIN_URL}${BASE_URL}`,
				},
			)
		).data as IBaseResponse<IResearchType[]>;
	}
	if (researches.message && !researches.success) return notFound();

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
		keywords: ['nghiên cứu aia', ...metaKeywords],
		openGraph: {
			title: `${t('meta_title')} | ${AppConfig.name}`,
			description: `${t('meta_description')}`,
			url: `${ORIGIN_URL}/course`,
			siteName: AppConfig.name,
			images: [
				{
					url: researches?.data?.[0]?.thumbnail,
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

export default async function ResearchPage() {
	let researches: IBaseResponse<IResearchType[]> = (
		await apiClient.post(
			`/research-types/search`,
			{},
			{
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
			},
		)
	).data as IBaseResponse<IResearchType[]>;

	// DB sometimes returns error
	while (researches.message === ERROR_TIMEOUT && !researches.success) {
		researches = (
			await apiClient.post(
				`/research-types/search`,
				{},
				{
					baseURL: `${ORIGIN_URL}${BASE_URL}`,
				},
			)
		).data as IBaseResponse<IResearchType[]>;
	}
	if (researches.message && !researches.success) return notFound();

	return (
		<>
			<Breadcrumb />
			<ResearchList data={researches} />
		</>
	);
}
