'use client';
import {
	Box,
	Container,
	Flex,
	Grid,
	Group,
	Image,
	Text,
	ThemeIcon,
	rem,
} from '@mantine/core';
import { TitleCombo } from '../mantines/typographies/TitleCombo';
import { imgHome } from '@/assets/images/home';
import {
	IconBrandFacebookFilled,
	IconBrandTwitterFilled,
} from '@tabler/icons-react';
import classes from './scss/member.module.scss';
import Link from 'next/link';

const dataMembers = [...Array(8)].map((_, index) => ({
	id: index,
	image: imgHome.scientist,
	title: 'Merv Adrian',
	positions: ['Data Management'],
	links: {
		facebook: '/',
		instagram: '/',
		linkedin: '/',
		twitter: '/',
	},
}));

export const MemberHome = (): JSX.Element => {
	return (
		<section className={classes.section}>
			<Container size="xl">
				<Box
					pt={{ base: 60, md: 80, lg: 100 }}
					pb={{ base: 30, md: 40, lg: 60 }}
				>
					<TitleCombo
						titleSub="TEAM MEMBERS"
						titleChildren={'Our Data Scientist'}
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
					/>

					<Grid mt={24} gutter={32}>
						{dataMembers.map((item) => (
							<Grid.Col
								key={item.id}
								span={{ base: 12, xs: 6, md: 3 }}
								style={{ position: 'relative', textAlign: 'center' }}
							>
								<Box className={classes.imgBox}>
									<Image
										h={'auto'}
										maw={'100%'}
										src={item.image}
										width={550}
										height={550}
										radius={'sm'}
										alt={item.title}
									/>
									<Flex className={classes.socials}>
										<Link href={item.links.facebook}>
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
										</Link>
										<Link href={item.links.facebook}>
											<ThemeIcon
												className={classes.socialItem}
												radius={'xl'}
												size={'lg'}
												color="white"
											>
												<IconBrandTwitterFilled
													fill="var(--mantine-color-gray-7)"
													size={20}
												/>
											</ThemeIcon>
										</Link>
									</Flex>
								</Box>

								<Text fw={700} fz={rem(20)} mt={8}>
									{item.title}
								</Text>
								<Group justify="center">
									{item.positions.map((pos, index) => (
										<Text c="primary" fz={rem(13)} fw={600} key={index}>
											{pos}
										</Text>
									))}
								</Group>
							</Grid.Col>
						))}
					</Grid>
				</Box>
			</Container>
		</section>
	);
};
