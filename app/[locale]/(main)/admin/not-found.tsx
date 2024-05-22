import { getTranslations } from 'next-intl/server';

import { NotFoundTitle } from '@/components/errors/404';
import AdminLayout from '@/components/layouts/AdminLayout';
import { AppConfig } from '@/utils/config';

export const dynamic = 'force-dynamic';

interface Props {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}

export async function generateMetadata(props: Props) {
	const t = await getTranslations({
		locale: props.params?.locale,
		namespace: 'global',
	});

	return {
		title: `${t('title_notfound')} | ${AppConfig.name}`,
	};
}

export default function Error({ params }: Props) {
	return (
		<AdminLayout params={params}>
			<NotFoundTitle />
		</AdminLayout>
	);
}
