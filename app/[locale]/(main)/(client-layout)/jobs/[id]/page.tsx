import { JobDetail } from '@/components/job/JobDetail';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { IJob } from '@/types/job';
import { AppConfig, ORIGIN_URL, metaKeywords } from '@/utils/config';
import { fetchGetData } from '@/utils/services/base.service';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		id: string;
		locale: string;
	};
}

export async function generateMetadata({ params }: Props) {
	let data: IJob = await fetchGetData(`/jobs/get-by-id/${params.id}`);

	if (data.message && !data.success) return notFound();

	// Cannot fetch api from localhost with production
	const title = `${data.job_name}`;

	return {
		title: `${title} | ${AppConfig.name}`,
		description: data.job_name,
		keywords: [data.job_name, ...metaKeywords],
		openGraph: {
			title: `${title} | ${AppConfig.name}`,
			description: data.job_name,
			url: `${ORIGIN_URL}/product/` + +params.id,
			siteName: AppConfig.name,
			images: [
				{
					url: '/assets/images/product/product.png',
					width: 1800,
					height: 1600,
					alt: `${title} | ${AppConfig.name}`,
				},
				{
					url: data.icon,
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
	let data: IJob = await fetchGetData(`/jobs/get-by-id/${params.id}`);

	if (data.message && !data.success) return notFound();

	return (
		<>
			<Breadcrumb lastLabel={data?.job_name} />
			<JobDetail data={data} />
		</>
	);
}
