import { AppConfig, ORIGIN_URL, metaKeywords } from '@/utils/config';
import { BlogDetail } from '@/components/blogs/detail/BlogDetail';
import { IBlog } from '@/types/blog';
import { fetchGetData } from '@/utils/services/base.service';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		locale: string;
		id: string;
	};
	searchParams: any;
}

export async function generateMetadata({ params }: Props) {
	// Cannot fetch api from localhost with production
	// Cannot resolve
	let data: IBlog = await fetchGetData(`/blogs/get-by-id/${params.id}`);

	if (data.message && !data.success) return notFound();

	// if (!data || data.message) return notFound();
	const title = `${data.title}`;

	return {
		title: `${title} | ${AppConfig.name}`,
		description: data.meta_content,
		keywords: [data.title, ...metaKeywords],
		openGraph: {
			title: `${title} | ${AppConfig.name}`,
			description: data.meta_content,
			url: `${ORIGIN_URL}/blogs/` + +params.id,
			siteName: AppConfig.name,
			images: [
				{
					url: '/assets/images/product/product.png',
					width: 1800,
					height: 1600,
					alt: `${title} | ${AppConfig.name}`,
				},
				{
					url: data.thumbnail,
					width: 1800,
					height: 1600,
					alt: `${title} | ${AppConfig.name}`,
				},
			],
			locale: params.locale,
			type: 'website',
		},
	};
}

export default async function BlogDetailPage({ params }: Props) {
	let data: IBlog = await fetchGetData(`/blogs/get-by-id/${params.id}`);

	if (data.message && !data.success) return notFound();

	return (
		<>
			<BlogDetail data={data} locale={params.locale} />
		</>
	);
}
