'use client';

import { useState } from 'react';

import {
	Box,
	Card,
	Container,
	Flex,
	Grid,
	Group,
	Image,
	Pagination,
	Text,
	useMantineTheme,
} from '@mantine/core';

import classes from './scss/course-list.module.scss';

import Link from 'next/link';
import { COURSE_DETAIL_URL } from '@/libs/urls';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { IconCalendar } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/libs/i18n-navigation';
import { dataCourses } from './data/data-fake';
import { SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { getUrlDetail } from '@/utils/format-string';

export const CourseList = (): JSX.Element => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 6;

	const [dataPagination, setDataPagination] = useState(
		dataCourses.slice((+page - 1) * +pageSize, +pageSize * +page),
	);
	const theme = useMantineTheme();

	const handleChangePagination = (page: number, pageSizeNew?: number) => {
		const current = new URLSearchParams(searchParams.toString());

		const data = dataCourses.slice(
			(page - 1) * (pageSizeNew || +pageSize),
			(pageSizeNew || +pageSize) * page,
		);

		current.set(SEARCH_PAGE, page.toString());
		pageSizeNew && current.set(SEARCH_SIZE, pageSizeNew.toString());

		setDataPagination(data);

		router.push(`${pathname}?${current}`);
		router.refresh();
	};

	return (
		<section className={classes.section}>
			<Container size="xl">
				<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
					<Grid gutter={24}>
						{dataPagination.map((item) => (
							<Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4 }}>
								<Card shadow="sm" padding="xl" radius="md">
									<Card.Section>
										<Image
											src={item.thumbnail}
											height={250}
											alt="Norway"
											width={140}
										/>
									</Card.Section>

									<Group justify="space-between" mt="md">
										<Link
											className={classes.title}
											href={getUrlDetail(COURSE_DETAIL_URL, item.id)}
										>
											<TitleRender order={3} fz={{ base: 'lg', md: 'h3' }}>
												{item.title}
											</TitleRender>
										</Link>
									</Group>

									<Text py={16}>{item.description}</Text>

									<Group align="center" gap={4}>
										<IconCalendar color={theme.colors.primary[4]} />{' '}
										<Text c={theme.colors.gray[7]}>{item.time}</Text>
									</Group>
								</Card>
							</Grid.Col>
						))}

						<Grid.Col span={12}>
							<Flex justify={'center'}>
								<Pagination
									total={
										dataCourses.length / +pageSize +
										(dataCourses.length % +pageSize ? 1 : 0)
									}
									value={+page}
									onChange={handleChangePagination}
									size={'lg'}
									mt="sm"
								/>
							</Flex>
						</Grid.Col>
					</Grid>
				</Box>
			</Container>
		</section>
	);
};
