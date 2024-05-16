import { JobDetail } from '@/components/job/JobDetail';
import { dataJobs } from '@/components/job/data/data-fake';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { AppConfig } from '@/utils/config';
import { getTranslations } from 'next-intl/server';

interface Props {
	params: {
		id: string;
		locale: string;
	};
}

export async function generateMetadata({ params }: Props) {
	const t = await getTranslations('jobs');

	// Cannot fetch api from localhost with production
	// Cannot resolve
	await fetch('https://jsonplaceholder.typicode.com/todos');
	const title = dataJobs?.find((c) => c.id === +params.id)?.job_name;

	return {
		title: `${title} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default async function CourseDetailPage({ params }: Props) {
	const job = dataJobs?.find((c) => c.id === +params.id);

	return (
		<>
			<Breadcrumb lastLabel={job?.job_name} />
			<JobDetail dataDetail={job} />
		</>
	);
}
