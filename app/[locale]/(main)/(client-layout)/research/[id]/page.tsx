import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ResearchDetail } from '@/components/research/ResearchDetail';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { IBaseResponse } from '@/types';
import { IResearch } from '@/types/research';
import { AppConfig, ORIGIN_URL, metaKeywords } from '@/utils/config';
import { transformHtmlToString } from '@/utils/format-string';
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
	let data: IBaseResponse<IResearch[]> = await fetchGetData(
		`/researches/get-by-parent/${params.id}`,
	);

	if (data.message && !data.success) return notFound();

	// if (!data || data.message) return notFound();
	const item = data?.data?.[0];
	const title = `${item?.research_type_name}`;

	return {
		title: `${title} | ${AppConfig.name}`,
		description: transformHtmlToString(item?.type_description + ''),
		keywords: [item?.research_type_name, ...metaKeywords],
		openGraph: {
			title: `${title} | ${AppConfig.name}`,
			description: transformHtmlToString(item?.type_description + ''),
			url: `${ORIGIN_URL}/research/` + +params.id,
			siteName: AppConfig.name,
			images: [
				{
					url: '/assets/images/product/product.png',
					width: 1800,
					height: 1600,
					alt: `${title} | ${AppConfig.name}`,
				},
				{
					url: item?.thumbnail,
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

export default async function ResearchDetailPage({ params }: Props) {
	let data: IBaseResponse<IResearch[]> = await fetchGetData(
		`/researches/get-by-parent/${params.id}`,
	);

	if (data.message && !data.success) return notFound();

	return (
		<>
			<Breadcrumb lastLabel={data?.data?.[0]?.research_type_name} />
			<Suspense>
				<ResearchDetail data={data} />
			</Suspense>
		</>
	);
}
