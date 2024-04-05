'use client';

import {
	Box,
	Button,
	Container,
	Flex,
	Group,
	Paper,
	Text,
	useMantineTheme,
} from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import classes from './scss/carousel.module.scss';
import { Carousel } from '@mantine/carousel';
import { IconArrowRight, IconPlayerPlayFilled } from '@tabler/icons-react';
import { ButtonBubble } from '../buttons/ButtonBubble';
import Link from 'next/link';
import { useRef } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { TitleRender } from '../typographies/TitleRender';

const data = [
	{
		image:
			'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
		title: 'Modern Machine Learning Solutions!',
		description:
			'We think AI can bring the best results for clients business needs. Our SMART decesion making AI algorithm can identify the business needs and offers solutions.',
		category: 'Welcome',
	},
	{
		image:
			'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
		title: 'AI Based Modern Business Solutions',
		description:
			'We think AI can bring the best results for clients business needs. Our SMART decesion making AI algorithm can identify the business needs and offers solutions.',
		category: 'Welcome',
	},
];

interface Props {
	image: string;
	title: string;
	category: string;
	description: string;
	mobile?: boolean;
}

export const CarouselHome = (): JSX.Element => {
	const theme = useMantineTheme();
	const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
	const autoplay = useRef(Autoplay({ delay: 5000 }));
	const slides = data.map((item) => (
		<Carousel.Slide key={item.title}>
			<Card {...item} mobile={mobile} />
		</Carousel.Slide>
	));

	return (
		<Carousel
			className={classes.carouselWrap}
			height="calc(100vh - 85px)"
			slideSize={'100%'}
			slideGap={0}
			align="start"
			slidesToScroll={1}
			plugins={[autoplay?.current]}
			onMouseEnter={autoplay?.current?.stop}
			onMouseLeave={autoplay?.current?.reset}
		>
			{slides}
		</Carousel>
	);
};

function Card({ image, title, category, description, mobile }: Props) {
	return (
		<Paper
			shadow="md"
			// p="md"
			radius={'none'}
			style={{ backgroundImage: `url(${image})` }}
			className={classes.card}
		>
			<Flex
				align={'center'}
				justify={'flex-start'}
				style={{ height: '100%', width: '100%' }}
			>
				<Container size="xl" flex={1}>
					<Box w={mobile === false ? '50%' : '100%'}>
						<Text className={classes.category} size="xs">
							{category}
						</Text>
						<TitleRender my="md" c="white" order={1}>
							{title}
						</TitleRender>
						<Text c="white">{description}</Text>

						<Group mt="md" gap={16}>
							<Link href={'/'}>
								<ButtonBubble
									variant="filled"
									size="md"
									leftSection={<IconArrowRight />}
								>
									About Us
								</ButtonBubble>
							</Link>
							<Link href={'/'} style={{ textDecoration: 'none' }}>
								<Group gap={8}>
									<Button
										className={classes.btnIcon}
										size="md"
										radius={'100%'}
										p={0}
										w={60}
										h={60}
									>
										<IconPlayerPlayFilled size={32} />
									</Button>
									<Text fw={600} c="primary">
										WATCH VIDEO
									</Text>
								</Group>
							</Link>
						</Group>
					</Box>
				</Container>
			</Flex>
		</Paper>
	);
}
