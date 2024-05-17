'use client';

import {
	Anchor,
	Box,
	Container,
	Grid,
	Image,
	Text,
	TypographyStylesProvider,
} from '@mantine/core';

import { RESEARCH_DETAIL_URL } from '@/libs/urls';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { IconArrowRight } from '@tabler/icons-react';

import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { getUrlDetail } from '@/utils/format-string';
import { Link } from '@/libs/i18n-navigation';
import { IResearchType } from '@/types/research-type';
import { IBaseResponse } from '@/types';

interface Props {
	data: IBaseResponse<IResearchType[]>;
}

export const ResearchList = ({ data }: Props): JSX.Element => {
	return (
		<>
			{data?.data?.map((research, index) => (
				<section
					key={index}
					className={index % 2 ? '' : 'background-secondary'}
				>
					<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
						<Container size="xl">
							<Grid mt={24} gutter={{ base: 24, md: 64 }} align="center">
								<Grid.Col span={{ base: 12, md: 6 }} order={index % 2 ? 2 : 1}>
									{research?.slogan && (
										<Text fz={'h3'} fw={700} c={'primary'} pb={16} pl={16}>
											{research.slogan}
										</Text>
									)}
									<TitleRender order={2} pb={16} pl={16}>
										{research.research_type_name}
									</TitleRender>
									<Text pb={16} pl={16}>
										<TypographyStylesProvider
											dangerouslySetInnerHTML={{ __html: research.description }}
										></TypographyStylesProvider>
									</Text>
									<Anchor
										component={Link}
										href={getUrlDetail(
											RESEARCH_DETAIL_URL,
											research.research_type_id,
										)}
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
										alt={research.research_type_name}
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
