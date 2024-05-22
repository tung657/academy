import { AboutHome } from '@/components/home/AboutHome';
import { CarouselHome } from '@/components/home/Carousel';
import { MemberHome } from '@/components/home/MemberHome';
import { MissionValue } from '@/components/home/MissionValue';
import { Partner } from '@/components/home/Partner';
import { apiClient } from '@/helpers';
import { IBaseResponse, ISlide } from '@/types';
import { IInstructor } from '@/types/instructor';
import {
	AppConfig,
	BASE_URL,
	ERROR_TIMEOUT,
	ORIGIN_URL,
	metaKeywords,
} from '@/utils/config';
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

export default async function HomePage() {
	let instructors: IBaseResponse<IInstructor[]> = (
		await apiClient.post(
			`/instructors/search`,
			{},
			{
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
			},
		)
	).data;

	// DB sometimes returns error
	while (instructors.message === ERROR_TIMEOUT && !instructors.success) {
		instructors = (
			await apiClient.post(
				`/instructors/search`,
				{},
				{
					baseURL: `${ORIGIN_URL}${BASE_URL}`,
				},
			)
		).data;
	}

	let slides: IBaseResponse<ISlide[]> = (
		await apiClient.post(
			`/slides/search`,
			{},
			{
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
			},
		)
	).data;

	// DB sometimes returns error
	while (slides.message === ERROR_TIMEOUT && !slides.success) {
		slides = (
			await apiClient.post(
				`/slides/search`,
				{},
				{
					baseURL: `${ORIGIN_URL}${BASE_URL}`,
				},
			)
		).data;
	}

	return (
		<>
			<CarouselHome data={slides} />
			<Container size="xl">
				<AboutHome />
			</Container>

			<MissionValue />

			<MemberHome data={instructors} />

			<Partner />
		</>
	);
}
