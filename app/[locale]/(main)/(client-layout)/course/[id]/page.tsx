import { GridDetail } from '@/components/course/GridDetail';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { AppConfig } from '@/utils';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

export async function generateMetadata() {
	const t = await getTranslations('product');

	// Cannot fetch api from localhost with production
	// Cannot resolve
	await fetch('https://jsonplaceholder.typicode.com/todos');
	const title = 'Grid Details';

	return {
		title: `${title} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default async function GridDetailPage() {
	const title = 'Grid Details';

	return (
		<>
			<Breadcrumb lastLabel={title} />
			<Suspense>
				<GridDetail />
			</Suspense>
		</>
	);
}