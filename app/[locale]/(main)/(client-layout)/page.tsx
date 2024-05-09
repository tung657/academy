import { AboutHome } from '@/components/home/AboutHome';
import { CarouselHome } from '@/components/home/Carousel';
import { MemberHome } from '@/components/home/MemberHome';
import { MissionValue } from '@/components/home/MissionValue';
import { Partner } from '@/components/home/Partner';
import { AppConfig, ORIGIN_URL, metaKeywords } from '@/utils/config';
import { Container } from '@mantine/core';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'home',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
		keywords: ['trang chủ aia', ...metaKeywords],
		openGraph: {
			title: `${t('meta_title')} | ${AppConfig.name}`,
			description: `${t('meta_description')}`,
			url: ORIGIN_URL,
			siteName: AppConfig.name,
			images: [
				{
					url: '/assets/images/home/home.png',
					width: 1800,
					height: 1600,
					alt: `${t('meta_title')} | ${AppConfig.name}`,
				},
			],
			locale: props.params.locale,
			type: 'website',
		},
	};
}

export default function HomePage() {
	return (
		<>
			<CarouselHome />
			<Container size="xl">
				<AboutHome />
			</Container>

			<MissionValue />

			<MemberHome />

			<Partner />
		</>
	);
}
