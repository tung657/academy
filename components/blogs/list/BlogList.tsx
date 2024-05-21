'use client';

import { dataBlogs, dataTypesBlogs } from '../data/data-fake';
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
import { SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/libs/i18n-navigation';
import { calcTotalPages } from '@/utils/format-number';
import { BlogLoading } from './BlogLoading';
import { IBaseDropdown } from '@/types';

interface Props {
	options: IBaseDropdown;
}

export const BlogList = ({ options }: Props): JSX.Element => {
	const dataOptions = [...options, ...dataTypesBlogs];
	const t = useTranslations();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const pathname = usePathname();
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
			<Box pt={{ base: 60, md: 80, lg: 100 }} pb={{ base: 30, md: 40, lg: 60 }}>
				<Container size="xl">
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
								) : (
									dataBlogs.map((item, index) => (
										<Box key={item.id}>
											<ScrollMotion isY delay={0.2 * index}>
												<Card key={item.id} withBorder>
													<Flex
														justify={'space-between'}
														align={'center'}
														mb={16}
													>
														<Group gap={8}>
															<Avatar src={item.avatar} alt={item.author} />
															<Text fz={'sm'} fw={700}>
																{item.author}
															</Text>
														</Group>
														<ShareSocial />
													</Flex>
													<Flex align={'center'} gap={16}>
														<Stack gap={8}>
															<Anchor
																href={getUrlDetail(BLOG_DETAIL_URL, item.id)}
															>
																<Title order={4}>{item.title}</Title>
															</Anchor>
															<Text c={'gray.7'}>{item.meta_content}</Text>
															<Group align="center">
																{item.type && (
																	<Anchor>
																		<Pill size="md" className={classes.pill}>
																			{
																				dataOptions.find(
																					(i) => i.value === item.type,
																				)?.label
																			}
																		</Pill>
																	</Anchor>
																)}
																<Group gap={6}>
																	<Text fz="sm">
																		{dayjs(item.created_date).format(
																			formatDateShow,
																		)}
																	</Text>
																	<Text mb={8}>.</Text>
																	<Text fz="sm">
																		{item.reading_time} phút đọc
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
										<Anchor>
											<Pill
												className={classes.pill}
												c={'gray.7'}
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
									total={calcTotalPages(pageSize, dataBlogs.length)}
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
