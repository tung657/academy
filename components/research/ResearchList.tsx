'use client';

import { Anchor, Box, Container, Grid, Image, Text } from '@mantine/core';

import { RESEARCH_DETAIL_URL } from '@/libs/urls';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { IconArrowRight } from '@tabler/icons-react';

import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { getUrlDetail } from '@/utils/format-string';
import { researchTypeOptions } from './data/data-fake';
import { Link } from '@/libs/i18n-navigation';

export const ResearchList = (): JSX.Element => {
	return (
		<>
			{researchTypeOptions.map((research, index) => (
				<section
					key={index}
					className={index % 2 ? '' : 'background-secondary'}
				>
					<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
						<Container size="xl">
							<Grid mt={24} gutter={{ base: 24, md: 64 }} align="center">
								<Grid.Col span={{ base: 12, md: 6 }} order={index % 2 ? 2 : 1}>
									<Text fz={'h3'} fw={700} c={'primary'} pb={16} pl={16}>
										Nghiên cứu của AIA
									</Text>
									<TitleRender order={2} pb={16} pl={16}>
										{research.label}
									</TitleRender>
									<Text pb={16} pl={16}>
										{research.description}
									</Text>
									<Anchor
										component={Link}
										href={getUrlDetail(RESEARCH_DETAIL_URL, research.id)}
									>
										<ButtonBubble
											ml={16}
											variant="filled"
											size="md"
											leftSection={<IconArrowRight />}
										>
											Xem chi tiết
										</ButtonBubble>
									</Anchor>
								</Grid.Col>

								<Grid.Col span={{ base: 12, md: 6 }} order={index % 2 ? 1 : 2}>
									<Image
										src={research.thumbnail}
										width={470}
										height={314}
										w={'100%'}
										h={'auto'}
										loading="lazy"
										alt={research.label}
									/>
								</Grid.Col>
							</Grid>
						</Container>
					</Box>
				</section>
			))}
		</>
	);
};
