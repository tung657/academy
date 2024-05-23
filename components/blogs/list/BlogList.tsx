'use client';

import { dataTypesBlogs } from '../data/data-fake';
import classes from './scss/blog.module.scss';
import {
	Anchor,
	Avatar,
	Box,
	Card,
	Container,
	Flex,
	Grid,
	Group,
	Image,
	Pagination,
	Pill,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import { formatDateShow, getUrlDetail } from '@/utils/format-string';
import { BLOG_DETAIL_URL } from '@/libs/urls';
import { ShareSocial } from '@/components/shared/ShareSocial';
import { ScrollMotion } from '@/components/shared/motion/ScrollMotion';
import { useSearchParams } from 'next/navigation';
import { SEARCH_DEPARTMENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/libs/i18n-navigation';
import { calcTotalPages } from '@/utils/format-number';
import { BlogLoading } from './BlogLoading';
import { IBaseDropdown, IBaseResponse } from '@/types';
import { IBlog } from '@/types/blog';
import { Empty } from '@/components/errors/empty';

interface Props {
	options: IBaseDropdown;
	data: IBaseResponse<IBlog[]>;
}

export const BlogList = ({ options, data }: Props): JSX.Element => {
	const dataOptions = [...dataTypesBlogs, ...options];
	const t = useTranslations();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const pathname = usePathname();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 6;
	const topicSearch = searchParams.get(SEARCH_DEPARTMENT) || '';

	const handleChangePagination = (page: number, pageSizeNew?: number) => {
		const current = new URLSearchParams(searchParams.toString());

		current.set(SEARCH_PAGE, page.toString());
		pageSizeNew && current.set(SEARCH_SIZE, pageSizeNew.toString());

		router.push(`${pathname}?${current}`);
		startTransition(() => router.refresh());
	};

	const handleSearchTopic = (topic_id: number) => {
		const current = new URLSearchParams(searchParams.toString());

		current.set(SEARCH_PAGE, '1');
		current.set(SEARCH_DEPARTMENT, (topic_id || '').toString());

		router.push(`${pathname}?${current}`);
		startTransition(() => router.refresh());
	};

	return (
		<section className={classes.section}>
			<Box pt={{ base: 60, md: 80, lg: 100 }} pb={{ base: 30, md: 40, lg: 60 }}>
				<Container size="xl">
					{topicSearch && (
						<ScrollMotion isY once>
							<Title order={3} pb={8}>
								Tag:{' '}
								{dataOptions.find((tag) => tag.value === topicSearch)?.label}
							</Title>
						</ScrollMotion>
					)}
					<ScrollMotion isY once>
						<Title order={2}>{t('blogs.title')}</Title>
					</ScrollMotion>
					<ScrollMotion isY once delay={0.2}>
						<Text pb={16} pt={8}>
							{t('blogs.title_sub')}
						</Text>
					</ScrollMotion>
					<Grid gutter={{ base: 24, md: 64 }}>
						<Grid.Col span={{ base: 12, md: 8 }} order={{ base: 2, md: 1 }}>
							<Stack>
								{isPending ? (
									<BlogLoading />
								) : data?.totalItems === 0 ? (
									<Empty />
								) : (
									data?.data?.map((item, index) => (
										<Box key={item.blog_id}>
											<ScrollMotion isY delay={0.2 * index}>
												<Card withBorder>
													<Flex
														justify={'space-between'}
														align={'center'}
														mb={16}
													>
														<Group gap={8}>
															<Avatar
																src={item.avatar}
																alt={item.created_user}
															/>
															<Text fz={'sm'} fw={700}>
																{item.created_user}
															</Text>
														</Group>
														<ShareSocial />
													</Flex>
													<Flex align={'center'} gap={16}>
														<Stack gap={8}>
															<Anchor
																href={getUrlDetail(
																	BLOG_DETAIL_URL,
																	item.blog_id,
																)}
															>
																<Title order={4}>{item.title}</Title>
															</Anchor>
															<Text c={'gray.7'}>{item.meta_content}</Text>
															<Group align="center">
																{item.research_type_name && (
																	<Anchor
																		onClick={() =>
																			handleSearchTopic(item.topic_id)
																		}
																	>
																		<Pill size="md" className={classes.pill}>
																			{item.research_type_name}
																		</Pill>
																	</Anchor>
																)}
																<Group gap={6}>
																	<Text fz="sm">
																		{dayjs(item.created_date_time).format(
																			formatDateShow,
																		)}
																	</Text>
																	<Text mb={8}>.</Text>
																	<Text fz="sm">
																		{item.read_time} {t('global.minutes')}
																	</Text>
																</Group>
															</Group>
														</Stack>
														{item.thumbnail && (
															<Image
																w={200}
																mah={120}
																fit="cover"
																src={item.thumbnail}
																alt={item.title}
																loading="lazy"
															/>
														)}
													</Flex>
												</Card>
											</ScrollMotion>
										</Box>
									))
								)}
							</Stack>
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 4 }} order={{ base: 1, md: 2 }}>
							<ScrollMotion isY once>
								<Title order={3} c={'gray.7'} mb={8}>
									{t('blogs.title_suggestion')}
								</Title>
							</ScrollMotion>
							<Group>
								{dataOptions?.map((item, index) => (
									<ScrollMotion
										isX={50}
										once
										key={item.value}
										delay={0.2 * index}
									>
										<Anchor onClick={() => handleSearchTopic(+item.value)}>
											<Pill
												className={classes.pill}
												c={item.value === topicSearch ? 'primary' : 'gray.7'}
												fw={500}
												size="md"
											>
												{item.label}
											</Pill>
										</Anchor>
									</ScrollMotion>
								))}
							</Group>
						</Grid.Col>

						<Grid.Col span={12} order={3}>
							<Flex justify={'center'}>
								<Pagination
									total={calcTotalPages(pageSize, data?.totalItems || 0)}
									value={+page}
									onChange={handleChangePagination}
									size={'lg'}
								/>
							</Flex>
						</Grid.Col>
					</Grid>
				</Container>
			</Box>
		</section>
	);
};
