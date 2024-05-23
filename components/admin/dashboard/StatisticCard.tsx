'use client';

import {
	Card,
	Flex,
	Grid,
	Pill,
	Skeleton,
	Stack,
	Text,
	ThemeIcon,
	Tooltip,
} from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconUsers } from '@tabler/icons-react';

import { useStatisticCard } from '@/utils/query-loader/dashboard.loader';

const listColors = ['violet', 'orange', 'blue', 'green'];

export const StatisticCard = (): JSX.Element => {
	const { data, isFetching } = useStatisticCard({});

	return (
		<>
			<Grid>
				{isFetching
					? [...Array(4)].map((_, index) => (
							<Grid.Col key={index} span={{ base: 12, sm: 6, lg: 3 }}>
								<Skeleton h={180} />
							</Grid.Col>
						))
					: data?.data?.map((item, index) => (
							<Grid.Col key={index} span={{ base: 12, sm: 6, lg: 3 }}>
								<Card h={180}>
									<Stack justify="space-between">
										<ThemeIcon
											size={'xl'}
											radius={'50%'}
											color={listColors[index]}
										>
											<IconUsers />
										</ThemeIcon>
										<Text size="md" fw={600}>
											{item.label}
										</Text>
										<Flex justify={'space-between'} align={'center'}>
											<Text fw={'bold'} fz={40}>
												{item.total}
											</Text>

											<Tooltip label="So với tháng trước">
												<Pill
													size="md"
													bg={
														+item.percent_change === 0
															? 'blue.0'
															: +item.percent_change > 0
																? 'green.0'
																: 'red.0'
													}
													c={
														+item.percent_change === 0
															? 'blue'
															: +item.percent_change > 0
																? 'green'
																: 'red'
													}
												>
													<Flex h={'100%'} align={'center'} gap={4}>
														{+item.percent_change === 0 ? (
															<></>
														) : +item.percent_change > 0 ? (
															<IconArrowUp size={16} />
														) : (
															<IconArrowDown size={16} />
														)}
														<Text>{+item.percent_change}%</Text>
													</Flex>
												</Pill>
											</Tooltip>
										</Flex>
									</Stack>
								</Card>
							</Grid.Col>
						))}
			</Grid>
		</>
	);
};
