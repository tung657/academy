'use client';

import { Box, Container, Grid, Image, Text } from '@mantine/core';

import { TitleRender } from '../mantines/typographies/TitleRender';
import { dataResearches } from './data/data-fake';

const dataInterface = dataResearches[0];

interface Props {
	dataDetail?: (typeof dataInterface)[];
}

export const ResearchDetail = ({ dataDetail }: Props): JSX.Element => {
	return (
		<>
			{dataDetail?.map((research, index) => (
				<section
					key={index}
					className={index % 2 ? '' : 'background-secondary'}
				>
					<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
						<Container size="xl">
							<Grid mt={24} gutter={{ base: 24, md: 64 }} align="center">
								<Grid.Col span={{ base: 12, md: 6 }} order={index % 2 ? 2 : 1}>
									<Text fz={22} fw={700} c={'primary'} pb={16} pl={16}>
										Nghiên cứu của AIA
									</Text>
									<TitleRender order={2} pb={16} pl={16}>
										{research.label}
									</TitleRender>
									<Text pb={16} pl={16}>
										{research.contents.join(' ')}
									</Text>
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
