'use client';

import { AboutHome } from '@/components/home/AboutHome';
import { CarouselHome } from '@/components/home/Carousel';
import { MemberHome } from '@/components/home/MemberHome';
import { OurSolution } from '@/components/home/OurSolution';
import { ServiceHome } from '@/components/home/ServiceHome';
import { Container } from '@mantine/core';

export default function Home() {
	return (
		<>
			<CarouselHome />
			<Container size="xl">
				<OurSolution />

				<AboutHome />
			</Container>

			<ServiceHome />

			<MemberHome />
		</>
	);
}
