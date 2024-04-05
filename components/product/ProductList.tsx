'use client';

import { Box, Card, Container, Grid, Text } from '@mantine/core';
import classes from './scss/product.module.scss';
import { IconRocket } from '@tabler/icons-react';
import Link from 'next/link';
import { TitleRender } from '../typographies/TitleRender';
import { getUrlDetail } from '@/utils';
import { PRODUCT_DETAIL_URL } from '@/libs/urls';

export const ProductList = (): JSX.Element => {
	return (
		<section className={classes.section}>
			<Container size="xl">
				<Box
					pt={{ base: 60, md: 80, lg: 100 }}
					pb={{ base: 30, md: 40, lg: 60 }}
				>
					<Grid gutter={24}>
						{[...Array(6)].map((_, index) => (
							<Grid.Col key={index} span={{ base: 12, sm: 4 }}>
								<Card
									shadow="xs"
									py={24}
									px={32}
									withBorder
									className={classes.card}
								>
									<Card.Section py={16}>
										<IconRocket size={80} stroke={0.7} />
									</Card.Section>

									<Link href={getUrlDetail(PRODUCT_DETAIL_URL, index + 1)}>
										<TitleRender order={4}>Startup Applications</TitleRender>
									</Link>

									<Text c="dimmed" fw={400} my={16}>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										adipiscing aliqua.
									</Text>

									<Link href={getUrlDetail(PRODUCT_DETAIL_URL, index + 1)}>
										<Text c="primary" fw={600} className={classes.btnDetail}>
											View Details
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
