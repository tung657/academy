'use client';

import { useState } from 'react';

import {
	Badge,
	Box,
	Card,
	Container,
	Grid,
	Group,
	Image,
	Pagination,
	Text,
} from '@mantine/core';

import classes from './scss/coursegrid.module.scss';

import { getUrlDetail } from '@/utils';
import Link from 'next/link';
import { COURSE_DETAIL_URL } from '@/libs/urls';

export const CourseGrid = (): JSX.Element => {
	const [activePage, setPage] = useState(1);
	return (
		<section className={classes.section}>
			<Container size="xl">
				<Box
					pt={{ base: 60, md: 80, lg: 100 }}
					pb={{ base: 30, md: 40, lg: 60 }}
				>
					<Grid gutter={24}>
						{[...Array(9)].fill(0).map((_, index) => (
							<Grid.Col key={index} span={{ base: 12, sm: 4 }}>
								<Card shadow="sm" padding="lg" radius="md" withBorder>
									<Card.Section>
										<Image
											src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
											height={250}
											alt="Norway"
											width={140}
										/>
									</Card.Section>

									<Group justify="space-between" mt="md" mb="xs">
										<Text fw={500}>Norway Fjord Adventures</Text>
										<Badge color="pink">On Sale</Badge>
									</Group>

									<Text size="sm" c="dimmed">
										With Fjord Tours you can explore more of the magical fjord
										landscapes with tours and activities on and around the
										fjords of Norway
									</Text>

									<Link href={getUrlDetail(COURSE_DETAIL_URL, index + 1)}>
										<Text c="primary" fw={600} className={classes.btnDetail}>
											View Details
										</Text>
									</Link>
								</Card>
							</Grid.Col>
						))}

						<Pagination
							total={3}
							value={activePage}
							onChange={setPage}
							mt="sm"
						/>
					</Grid>
				</Box>
			</Container>
		</section>
	);
};
