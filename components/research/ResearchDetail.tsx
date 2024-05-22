'use client';

import {
	Box,
	Container,
	Grid,
	Image,
	Text,
	TypographyStylesProvider,
} from '@mantine/core';

import { IBaseResponse } from '@/types';
import { IResearch } from '@/types/research';

import { TitleRender } from '../mantines/typographies/TitleRender';
import { ScrollMotion } from '../shared/motion/ScrollMotion';

interface Props {
	data: IBaseResponse<IResearch[]>;
}

export const ResearchDetail = ({ data }: Props): JSX.Element => {
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
										<ScrollMotion isY once>
											<Text fz={'h3'} fw={700} c={'primary'} pb={16} pl={16}>
												{research.slogan}
											</Text>
										</ScrollMotion>
									)}
									<ScrollMotion isY once delay={0.2}>
										<TitleRender order={2} pb={16} pl={16}>
											{research.research_name}
										</TitleRender>
									</ScrollMotion>
									<ScrollMotion isY once delay={0.4}>
										<Text pl={16} lineClamp={4}>
											<TypographyStylesProvider
												dangerouslySetInnerHTML={{
													__html: research.description,
												}}
											></TypographyStylesProvider>
										</Text>
									</ScrollMotion>
								</Grid.Col>

								<Grid.Col span={{ base: 12, md: 6 }} order={index % 2 ? 1 : 2}>
									<ScrollMotion isX={index % 2 ? -100 : 100} once>
										<Image
											src={research.thumbnail}
											width={470}
											height={314}
											w={'100%'}
											h={'auto'}
											loading="lazy"
											alt={research.research_name}
										/>
									</ScrollMotion>
								</Grid.Col>
							</Grid>
						</Container>
					</Box>
				</section>
			))}
		</>
	);
};
