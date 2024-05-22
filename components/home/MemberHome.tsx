'use client';

import {
	Anchor,
	BackgroundImage,
	Box,
	Container,
	Flex,
	Grid,
	Image,
	Text,
	ThemeIcon,
	rem,
} from '@mantine/core';
import { TitleCombo } from '../mantines/typographies/TitleCombo';
import {
	IconBrandFacebookFilled,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandXFilled,
} from '@tabler/icons-react';
import classes from './scss/member.module.scss';
import { imgOthers } from '@/assets/images/others';
import { IBaseResponse } from '@/types';
import { IInstructor } from '@/types/instructor';

interface Props {
	data: IBaseResponse<IInstructor[]>;
}

export const MemberHome = ({ data }: Props): JSX.Element => {
	return (
		<section className={`${classes.section} background-secondary`}>
			<BackgroundImage
				src={imgOthers.circleShapeIcon}
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

						<Grid mt={24} gutter={32}>
							{data?.data?.map((item) => (
								<Grid.Col
									key={item.instructor_id}
									span={{ base: 12, xs: 6, md: 3 }}
									style={{ position: 'relative', textAlign: 'center' }}
								>
									<Box className={classes.imgBox}>
										<Image
<<<<<<< components/home/MemberHome.tsx
											height={300}
>>>>>>> components/home/MemberHome.tsx
											maw={'100%'}
											src={item.avatar}
											width={550}
											radius={'sm'}
											loading="lazy"
											alt={item.instructor_name}
										/>
										<Flex className={classes.socials}>
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

									<Text fw={700} fz={rem(20)} mt={8}>
										{item.instructor_name}
									</Text>
									<Text c="primary" fz={rem(13)} fw={600}>
										{item.major}
									</Text>
								</Grid.Col>
							))}
						</Grid>
					</Box>
				</Container>
			</BackgroundImage>
		</section>
	);
};
