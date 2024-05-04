import { NotFoundTitle } from '@/components/errors/404';
import AdminLayout from '@/components/layouts/AdminLayout';
import { IBasePage } from '@/types';
import { AppConfig } from '@/utils/config';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: IBasePage) {
	const t = await getTranslations({
		locale: props.params?.locale,
		namespace: 'global',
	});

	return {
		title: `${t('title_notfound')} | ${AppConfig.name}`,
	};
}

export default function Error({ params }: IBasePage) {
	return (
		<AdminLayout params={params}>
			<NotFoundTitle />
		</AdminLayout>
	);
}
