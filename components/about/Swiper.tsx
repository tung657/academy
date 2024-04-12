'use client';

import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { Box, Card, Text, Image, Flex, Container } from '@mantine/core';

import classes from './scss/swiper.module.scss';
import { imgHome } from '@/assets/images/home';
import { TitleCombo } from '../mantines/typographies/TitleCombo';

export const Swiper = (): JSX.Element => {
	const autoplay = useRef(Autoplay({ delay: 5000 }));
	return (
		<section className={classes.section}>
			<Box pt={{ base: 60, md: 80, lg: 100 }} pb={{ base: 30, md: 40, lg: 60 }}>
				<Container size="xl">
					<TitleCombo
						titleSub="TESTIMONIALS"
						titleChildren="What Our Clients are Saying?"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
					/>
					<Carousel
						mt={'md'}
						withIndicators
						plugins={[autoplay.current]}
						onMouseEnter={autoplay.current.stop}
						onMouseLeave={autoplay.current.reset}
						slidesToScroll={1}
						initialSlide={3}
						slideSize={{ base: '100%', md: '33.333333%' }}
						slideGap="md"
						loop
					>
						{[...Array(6)].map((_, index) => (
							<Carousel.Slide key={index}>
								<Card
									shadow="xs"
									py={24}
									px={32}
									withBorder
									className={classes.card}
								>
									<Text c="dimmed" fw={400} my={16}>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										adipiscing aliqua.
									</Text>
									<Flex
										className={classes.imgBox}
										align={'center'}
										justify={'center'}
										gap={'sm'}
									>
										<Image
											className={classes.img}
											src={imgHome.howitswork}
											alt="image"
											width={500}
											height={500}
											w="50px"
											h="50px"
											radius={'xl'}
											loading="lazy"
											decoding="async"
											style={{ color: 'transparent' }}
										/>
										<Text>Thanh Tung</Text>
									</Flex>
								</Card>
							</Carousel.Slide>
						))}

						{/* ...other slides */}
					</Carousel>
				</Container>
			</Box>
		</section>
	);
};
