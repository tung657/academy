'use client';

import {
	Anchor,
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

import { COURSE_DETAIL_URL } from '@/libs/urls';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { IconCalendar } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { Link, usePathname, useRouter } from '@/libs/i18n-navigation';
import { SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { getUrlDetail } from '@/utils/format-string';
import { IBaseResponse } from '@/types';
import { ICourse } from '@/types/course';
import { calcTotalPages } from '@/utils/format-number';
import { InputSearch } from '../mantines/inputs/InputSearch';
import { useTranslations } from 'next-intl';
import { Empty } from '../errors/empty';
import { ScrollMotion } from '../shared/motion/ScrollMotion';
import { useTransition } from 'react';
interface Props {
	data: IBaseResponse<ICourse[]>;
}

export const CourseList = ({ data }: Props): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const pathname = usePathname();
	const theme = useMantineTheme();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 6;

	const handleChangePagination = (page: number, pageSizeNew?: number) => {
		const current = new URLSearchParams(searchParams.toString());

		current.set(SEARCH_PAGE, page.toString());
		pageSizeNew && current.set(SEARCH_SIZE, pageSizeNew.toString());

		router.push(`${pathname}?${current}`);
		startTransition(() => router.refresh());
	};

	return (
		<section className={classes.section}>
			<Container size="xl">
				<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
					<Flex justify={'space-between'} align={'center'} pb={24}>
						<ScrollMotion isX once>
							<TitleRender order={3}>{t('courses.title_sub')}</TitleRender>
						</ScrollMotion>
						<InputSearch startTransition={startTransition} size="md" />
					</Flex>
					{isPending ? (
						<p>Loading...</p>
					) : (
						<Grid gutter={24}>
							{data.data?.length === 0 ? (
								<Empty />
							) : (
								data?.data?.map((item) => (
									<Grid.Col
										key={item.course_id}
										span={{ base: 12, sm: 6, md: 4 }}
									>
										<ScrollMotion isY={50}>
											<Card shadow="sm" padding="md" radius="md">
												<Card.Section>
													<Image
														src={item.thumbnail}
														height={250}
														alt="Norway"
														width={140}
														loading="lazy"
													/>
												</Card.Section>

												<Group justify="space-between" my="md">
													<Anchor
														component={Link}
														className={classes.title}
														href={getUrlDetail(
															COURSE_DETAIL_URL,
															item.course_id,
														)}
													>
														<TitleRender
															order={3}
															fz={{ base: 'lg', md: 'h3' }}
														>
															{item.course_name}
														</TitleRender>
													</Anchor>
												</Group>

												<Text lineClamp={4}>{item.description}</Text>

												<Group align="center" gap={4} mt={'md'}>
													<IconCalendar color={theme.colors.primary[4]} />{' '}
													<Text c={theme.colors.gray[7]} tt={'lowercase'}>
														{item.duration} {t('global.week')}
													</Text>
												</Group>
											</Card>
										</ScrollMotion>
									</Grid.Col>
								))
							)}

							<Grid.Col span={12}>
								<Flex justify={'center'}>
									<Pagination
										total={calcTotalPages(pageSize, data?.totalItems)}
										value={+page}
										onChange={handleChangePagination}
										size={'lg'}
										mt="sm"
									/>
								</Flex>
							</Grid.Col>
						</Grid>
					)}
				</Box>
			</Container>
		</section>
	);
};
