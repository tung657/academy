'use client';

import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { Box, Card, Container, Image } from '@mantine/core';

import classes from './scss/partner.module.scss';
import { imgHome } from '@/assets/images/home';
import { TitleCombo } from '../mantines/typographies/TitleCombo';
import { useMediaQuery } from '@mantine/hooks';
import { VALUE_MOBILE } from '@/utils/config';

export const Partner = (): JSX.Element => {
	const autoplay = useRef(Autoplay({ delay: 5000 }));
	const isMobile = useMediaQuery(VALUE_MOBILE);

	return (
		<section className={classes.section}>
			<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
				<Container size="xl">
					<TitleCombo titleSub="Đối tác" titleChildren="Đối tác của AIA" />
					<Carousel
						mt={'md'}
						plugins={[autoplay.current]}
						onMouseEnter={autoplay.current.stop}
						onMouseLeave={autoplay.current.reset}
						slidesToScroll={isMobile ? 2 : 5}
						slideSize={{ base: '50%', md: '20%' }}
						slideGap="sm"
						loop
					>
						{[...Array(6)].map((_, index) => (
							<Carousel.Slide key={index}>
								<Card px={0} pb={0} className={classes.card}>
									<Image src={imgHome.aboutMember} alt="partner" />
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

/*
 <TitleCombo
						titleSub="Đối tác"
						titleChildren="Chia sẻ của khách hàng về AIA"
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
												src={imgHome.howItsWork}
												alt="image"
												w="50px"
												h="50px"
												style={{ color: 'transparent' }}
											/>
											<Stack gap={4} align="flex-start">
												<Text fz={'h4'} fw={700}>
													John Wick
												</Text>
												<Text fz={16} fw={700} c={'gray.6'}>
													CEO{' '}
												</Text>
											</Stack>
										</Flex>
									</Box>
								</Card>
							</Carousel.Slide>
						))}

						</Carousel> 
*/
