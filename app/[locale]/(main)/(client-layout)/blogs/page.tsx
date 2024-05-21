import { BlogList } from '@/components/blogs/list/BlogList';
import { getTranslations } from 'next-intl/server';
import { AppConfig, BASE_URL, ORIGIN_URL } from '@/utils/config';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { apiClient } from '@/helpers';
import { IBaseDropdown } from '@/types';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'blogs',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default async function BlogListPage() {
	let options: IBaseDropdown = (
		await apiClient.get(`/research-types/dropdown`, {
			baseURL: `${ORIGIN_URL}${BASE_URL}`,
		})
	).data as IBaseDropdown;

	if (options.message && !options.success) options = [];

	return (
		<>
			<Breadcrumb />
			<BlogList options={options} />
		</>
	);
}
