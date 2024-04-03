'use client';

import { AboutHome } from '@/components/home/AboutHome';
import { CarouselHome } from '@/components/home/Carousel';
import { OurSolution } from '@/components/home/OurSolution';
import { Container } from '@mantine/core';

export default function Home() {
	return (
		<>
			<CarouselHome />
			<Container size="xl">
				<OurSolution />

				<AboutHome />
			</Container>
		</>
	);
}
