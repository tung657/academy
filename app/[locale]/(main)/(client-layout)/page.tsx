'use client';

import { AboutHome } from '@/components/home/AboutHome';
import { CarouselHome } from '@/components/home/Carousel';
import { MemberHome } from '@/components/home/MemberHome';
import { MissionValue } from '@/components/home/MissionValue';
import { Partner } from '@/components/home/Partner';
import { Container } from '@mantine/core';

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
