import { getTranslations } from 'next-intl/server';

import { ClientLayout } from '@/components';
import { NotFoundTitle } from '@/components/errors/404';
import { AppConfig } from '@/utils/config';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'global',
	});

	return {
		title: `${t('title_notfound')} | ${AppConfig.name}`,
	};
}

export default function Error() {
	return (
		<ClientLayout>
			<NotFoundTitle />
		</ClientLayout>
	);
}
