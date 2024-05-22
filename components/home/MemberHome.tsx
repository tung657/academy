'use client';

import { Carousel } from '@mantine/carousel';
import {
	Anchor,
	BackgroundImage,
	Box,
	Container,
	Flex,
	Image,
	Text,
	ThemeIcon,
	rem,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
	IconBrandFacebookFilled,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandXFilled,
} from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

import { IBaseResponse } from '@/types';
import { IInstructor } from '@/types/instructor';
import { VALUE_MOBILE } from '@/utils/config';

import { TitleCombo } from '../mantines/typographies/TitleCombo';
import classes from './scss/member.module.scss';

interface Props {
	data: IBaseResponse<IInstructor[]>;
}

export const MemberHome = ({ data }: Props): JSX.Element => {
	const autoplay = useRef(Autoplay({ delay: 5000 }));
	const isMobile = useMediaQuery(VALUE_MOBILE);

	return (
		<section className={`${classes.section} background-secondary`}>
			<BackgroundImage
				src={''}
				style={{
					backgroundSize: 'inherit',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'bottom right',
				}}
			>
				<Container size="xl">
					<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
						<TitleCombo
							titleSub="TEAM MEMBERS"
							titleChildren={'Đội ngũ chuyên gia của chúng tôi'}
						/>

						{
							<Carousel
								mt={'md'}
								plugins={[autoplay.current]}
								onMouseEnter={autoplay.current.stop}
								onMouseLeave={autoplay.current.reset}
								slidesToScroll={'auto'}
								slideSize={{ base: '50%', sm: '33.33%', md: '25%', lg: '20%' }}
								dragFree
								slideGap="sm"
								loop
							>
								{data?.data?.map((item) => (
									<Carousel.Slide key={item.instructor_id}>
										<Box className={classes.imgBox}>
											<Image
												h={290}
												maw={'100%'}
												src={item.avatar}
												width={550}
												height={550}
												radius={'sm'}
												loading="lazy"
												alt={item.instructor_name}
											/>
											<Flex
												className={`${classes.socials} ${
													isMobile ? classes.mobile : ''
												}`}
											>
												{item.fb_link && (
													<Anchor
														href={item.fb_link}
														aria-label={item.instructor_name}
														target="_blank"
														rel="noopener"
													>
														<ThemeIcon
															className={classes.socialItem}
															radius={'xl'}
															size={'lg'}
															color="white"
														>
															<IconBrandFacebookFilled
																fill="var(--mantine-color-gray-7)"
																size={20}
															/>
														</ThemeIcon>
													</Anchor>
												)}
												{item.x_link && (
													<Anchor
														href={item.x_link}
														aria-label={item.instructor_name}
														target="_blank"
														rel="noopener"
													>
														<ThemeIcon
															className={classes.socialItem}
															radius={'xl'}
															size={'lg'}
															color="white"
														>
															<IconBrandInstagram
																fill="var(--mantine-color-gray-7)"
																size={20}
															/>
														</ThemeIcon>
													</Anchor>
												)}
												{item.ins_link && (
													<Anchor
														href={item.ins_link}
														aria-label={item.instructor_name}
														target="_blank"
														rel="noopener"
													>
														<ThemeIcon
															className={classes.socialItem}
															radius={'xl'}
															size={'lg'}
															color="white"
														>
															<IconBrandLinkedin
																fill="var(--mantine-color-gray-7)"
																size={20}
															/>
														</ThemeIcon>
													</Anchor>
												)}
												{item.linkedin_link && (
													<Anchor
														href={item.linkedin_link}
														aria-label={item.instructor_name}
														target="_blank"
														rel="noopener"
													>
														<ThemeIcon
															className={classes.socialItem}
															radius={'xl'}
															size={'lg'}
															color="white"
														>
															<IconBrandXFilled
																fill="var(--mantine-color-gray-7)"
																size={20}
															/>
														</ThemeIcon>
													</Anchor>
												)}
											</Flex>
										</Box>

										<Text fw={700} fz={rem(20)} mt={8} ta={'center'}>
											{item.instructor_name}
										</Text>
										<Text c="primary" fz={rem(13)} fw={600} ta={'center'}>
											{item.major}
										</Text>
									</Carousel.Slide>
								))}
							</Carousel>
						}
					</Box>
				</Container>
			</BackgroundImage>
		</section>
	);
};
