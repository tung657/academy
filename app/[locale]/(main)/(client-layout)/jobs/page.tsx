import { getTranslations } from 'next-intl/server';
import { AppConfig } from '@/utils/config';
import { JobList } from '@/components/job/JobList';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'jobs',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default function Job() {
	return (
		<>
			<JobList />
		</>
	);
}
