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

export const Blog = (): JSX.Element => {
	const t = useTranslations();
	// const searchParams = useSearchParams();
	// const page = searchParams.get(SEARCH_PAGE);
	// const pageSize = searchParams.get(SEARCH_SIZE);
	// const searchContent = searchParams.get(SEARCH_CONTENT);

	return (
		<section className={classes.section}>
			<Box pt={{ base: 60, md: 80, lg: 100 }} pb={{ base: 30, md: 40, lg: 60 }}>
				<Container size="xl">
					<Title order={2}>{t('blogs.title')}</Title>
					<Text pb={16} pt={8}>
						{t('blogs.title_sub')}
					</Text>
					<Grid gutter={{ base: 24, md: 64 }}>
						<Grid.Col span={{ base: 12, md: 8 }} order={{ base: 2, md: 1 }}>
							<Stack>
								{dataBlogs.map((item) => (
									<Card key={item.id} withBorder>
										<Flex justify={'space-between'} align={'center'} mb={16}>
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
												<Anchor href={getUrlDetail(BLOG_DETAIL_URL, item.id)}>
													<Title order={4}>{item.title}</Title>
												</Anchor>
												<Text c={'gray.7'}>{item.meta_content}</Text>
												<Group align="center">
													{item.type && (
														<Anchor>
															<Pill size="md">
																{
																	dataTypesBlogs.find((i) => i.id === item.type)
																		?.label
																}
															</Pill>
														</Anchor>
													)}
													<Group gap={6}>
														<Text fz="sm">
															{dayjs(item.created_date).format(formatDateShow)}
														</Text>
														<Text mb={8}>.</Text>
														<Text fz="sm">{item.reading_time} phút đọc</Text>
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
								))}
							</Stack>
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 4 }} order={{ base: 1, md: 2 }}>
							<Title order={3} c={'gray.7'} mb={8}>
								{t('blogs.title_suggestion')}
							</Title>
							<Group>
								{dataTypesBlogs.map((item) => (
									<Anchor key={item.id}>
										<Pill c={'gray.7'} size="md">
											{item.label}
										</Pill>
									</Anchor>
								))}
							</Group>
						</Grid.Col>
					</Grid>
				</Container>
			</Box>
		</section>
	);
};
