import { getTranslations } from 'next-intl/server';
import { AppConfig } from '@/utils';
import { JobList } from '@/components/job/JobList';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'job',
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