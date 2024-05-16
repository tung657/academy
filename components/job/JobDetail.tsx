import { Box, Container, Text, TypographyStylesProvider } from '@mantine/core';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { intlUSD } from '@/utils/format-number';
import { ApplyForm } from './ApplyForm';
import { IJob } from '@/types/job';

interface Props {
	data: IJob;
}

export const JobDetail = ({ data }: Props): JSX.Element => {
	return (
		<section>
			<Container size="xl">
				<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
					<TitleRender order={2} mb={8}>
						{data?.job_name}
					</TitleRender>
					<Text c={'gray.7'} mb={16}>
						{[
							data?.type_time,
							'Làm việc tại ' + data?.branch_name,
							intlUSD.format(Number(data?.salary)) + '+ VND',
						].join(' • ')}
					</Text>
					<ApplyForm mb={40} positionId={data?.job_id} />

					<TypographyStylesProvider>
						<div
							dangerouslySetInnerHTML={{ __html: data?.job_description || '' }}
						/>
					</TypographyStylesProvider>

					<ApplyForm mt={40} positionId={data?.job_id} />
				</Box>
			</Container>
		</section>
	);
};
