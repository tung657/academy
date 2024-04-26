'use client';
import { Box, Container, Text, TypographyStylesProvider } from '@mantine/core';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { dataJobs } from '../job/data/data-fake';
import { intlUSD } from '@/utils/format-number';

const dataInterface = dataJobs[0];
interface Props {
	dataDetail?: typeof dataInterface;
}

export const ProductDetail = ({ dataDetail }: Props): JSX.Element => {
	return (
		<section>
			<Container size="xl">
				<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
					<TitleRender order={2} mb={8}>
						{dataDetail?.job_name}
					</TitleRender>
					<Text c={'gray.7'} mb={16}>
						{[
							dataDetail?.duration,
							'Làm việc tại ' + dataDetail?.location,
							intlUSD.format(dataDetail?.salary || 0) + '+ VND',
						].join(' • ')}
					</Text>

					<TypographyStylesProvider>
						<div
							dangerouslySetInnerHTML={{ __html: dataDetail?.detail || '' }}
						/>
					</TypographyStylesProvider>
				</Box>
			</Container>
		</section>
	);
};
