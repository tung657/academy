import { ResearchDetail } from '@/components/research/ResearchDetail';
import {
	dataResearches,
	researchTypeOptions,
} from '@/components/research/data/data-fake';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { AppConfig } from '@/utils/config';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

interface Props {
	params: {
		locale: string;
		id: string;
	};
}

export async function generateMetadata({ params }: Props) {
	const t = await getTranslations('research');

	// Cannot fetch api from localhost with production
	// Cannot resolve
	const title = researchTypeOptions.find((i) => i.id.toString() === params.id)
		?.label;

	return {
		title: `${title} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default async function ProductDetailPage({ params }: Props) {
	const title = researchTypeOptions.find((i) => i.id.toString() === params.id)
		?.label;

	const dataDetail = dataResearches.filter(
		(i) => i.type.toString() === params.id,
	);

	return (
		<>
			<Breadcrumb lastLabel={title} />
			<Suspense>
				<ResearchDetail dataDetail={dataDetail} />
			</Suspense>
		</>
	);
}
