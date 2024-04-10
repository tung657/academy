'use client';
import { Box, Card, Container, Grid, Text } from '@mantine/core';
import classes from './scss/service.module.scss';
import { TitleCombo } from '../mantines/typographies/TitleCombo';
import Link from 'next/link';
import { TitleRender } from '../mantines/typographies/TitleRender';
import Image from 'next/image';
import { imgHome } from '@/assets/images/home';
import { IconArrowRight } from '@tabler/icons-react';

const dataServices = [...Array(6)].map((_, index) => ({
	id: index,
	image: imgHome.service,
	title: 'Data Analytics',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	link: '/',
}));

export const ServiceHome = (): JSX.Element => {
	return (
		<section className={classes.section}>
			<Container size="xl">
				<Box
					pt={{ base: 60, md: 80, lg: 100 }}
					pb={{ base: 30, md: 40, lg: 60 }}
				>
					<TitleCombo
						titleSub="Our Solution"
						titleChildren={'We Different From Others Should Choose Us'}
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
					/>

					<Grid mt={24} gutter={32}>
						{dataServices.map((item) => (
							<Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4 }}>
								<Card shadow="sm" p={24} className={classes.card}>
									<Card.Section py={16}>
										<Image
											src={item.image}
											width={78}
											height={70}
											alt={item.link}
										/>
									</Card.Section>

									<Link href={item.link}>
										<TitleRender order={4}>{item.title}</TitleRender>
									</Link>

									<Text c="dimmed" fw={400} my={16}>
										{item.description}
									</Text>

									<Link href={item.link}>
										<Text c="primary" fw={600} className={classes.btnDetail}>
											Read More <IconArrowRight />
										</Text>
									</Link>
								</Card>
							</Grid.Col>
						))}
					</Grid>
				</Box>
			</Container>
		</section>
	);
};
