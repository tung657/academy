import { AboutHome } from '@/components/home/AboutHome';
import { CarouselHome } from '@/components/home/Carousel';
import { MemberHome } from '@/components/home/MemberHome';
import { MissionValue } from '@/components/home/MissionValue';
import { Partner } from '@/components/home/Partner';
import { AppConfig } from '@/utils/config';
import { Container } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'home',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
		openGraph: {
			title: `${t('meta_title')} | ${AppConfig.name}`,
			description: `${t('meta_description')}`,
			url: 'https://aiacademy-dev.edu.vn',
			siteName: AppConfig.name,
			images: [
				{
					url: '/api/file/' + btoa('2024-05-08/how-its-work.png'),
					width: 1800,
					height: 1600,
					alt: 'My custom alt',
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
