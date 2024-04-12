'use client';

import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import {
	Box,
	Card,
	Text,
	Image,
	Flex,
	Container,
	Title,
	Stack,
	Avatar,
} from '@mantine/core';

import classes from './scss/partner.module.scss';
import { imgHome } from '@/assets/images/home';
import { TitleCombo } from '../mantines/typographies/TitleCombo';
import { IconQuote } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

export const Partner = (): JSX.Element => {
	const autoplay = useRef(Autoplay({ delay: 5000 }));
	const isMobile = useMediaQuery('(max-width: 62em)');

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
						plugins={[autoplay.current]}
						onMouseEnter={autoplay.current.stop}
						onMouseLeave={autoplay.current.reset}
						slidesToScroll={isMobile ? 1 : 2}
						slideSize={{ base: '100%', md: '50%' }}
						slideGap="md"
						loop
					>
						{[...Array(6)].map((_, index) => (
							<Carousel.Slide key={index}>
								<Card px={0} pb={0} pt={70} className={classes.card}>
									<IconQuote
										className={classes.icon}
										size={120}
										stroke={1}
										color="#f4f3f5"
									/>
									<Box
										py={24}
										px={64}
										bg={'gray.0'}
										style={{ borderRadius: '10px' }}
									>
										<Text fw={400} my={16}>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
											sed do eiusmod tempor incididunt ut labore et dolore magna
											adipiscing aliqua.
										</Text>
										<Flex
											className={classes.imgBox}
											align={'center'}
											justify={'center'}
											gap={'sm'}
										>
											<Avatar
												className={classes.img}
												src={imgHome.howitswork}
												alt="image"
												w="50px"
												h="50px"
												style={{ color: 'transparent' }}
											/>
											<Stack gap={4} align="flex-start">
												<Title order={4}>Thanh Tung</Title>
												<Text fz={16} fw={700} c={'gray.6'}>
													CEO{' '}
												</Text>
											</Stack>
										</Flex>
									</Box>
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