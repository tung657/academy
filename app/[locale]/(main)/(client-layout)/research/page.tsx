import { Research } from '@/components/research/Research';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { AppConfig } from '@/utils';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'research',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default function ResearchPage() {
	return (
		<>
			<Breadcrumb />
			<Research />
		</>
	);
}
