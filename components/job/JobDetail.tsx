'use client';

import {
	Affix,
	Anchor,
	Box,
	Container,
	Divider,
	Flex,
	Group,
	List,
	ListItem,
	Text,
	TypographyStylesProvider,
	UnstyledButton,
} from '@mantine/core';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { intlUSD } from '@/utils/format-number';
import { ApplyForm } from './ApplyForm';
import { IJob } from '@/types/job';
import {
	IconCash,
	IconChevronLeft,
	IconClock,
	IconMapPin,
	IconUserCircle,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/libs/i18n-navigation';
import { ORIGIN_URL } from '@/utils/config';

interface Props {
	data: IJob;
}

export const JobDetail = ({ data }: Props): JSX.Element => {
	const t = useTranslations();
	const router = useRouter();

	return (
		<section>
			<Container size="xl">
				<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
					<Flex gap={64} justify={'space-between'}>
						<Box>
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

							<TypographyStylesProvider>
								<div
									dangerouslySetInnerHTML={{
										__html: data?.job_description || '',
									}}
								/>
							</TypographyStylesProvider>

							<Box className="job-apply">
								<TitleRender order={3} mb={8}>
									Để ứng tuyển, vui lòng gửi cho chúng tôi:
								</TitleRender>
								<List spacing={4}>
									<ListItem>
										Thư ứng tuyển (cover letter): Nêu rõ tại sao bạn muốn làm
										việc với chúng tôi, và tại sao chúng tôi nên làm việc cùng
										bạn.
									</ListItem>
									<ListItem>
										Portfolio: với phần trình bày ít nhất 2 dự án bạn đã làm
										trong quá khứ.
									</ListItem>
									<ListItem>Resumé hoặc CV</ListItem>
								</List>
							</Box>

							<ApplyForm positionId={data?.job_id} />
						</Box>
						<Affix
							withinPortal={false}
							style={{ position: 'sticky' }}
							position={{
								top: 95,
								left: 0,
							}}
							h={200}
						>
							<Box w={300}>
								<Anchor
									component={Link}
									className={'btn-back'}
									href={ORIGIN_URL}
									onClick={(event) => {
										event.preventDefault();
										router.back();
									}}
								>
									<Group align="center" gap={4}>
										<IconChevronLeft stroke={1.8} size={18} />
										<UnstyledButton fw={500}>
											{t('global.btn_cancel')}
										</UnstyledButton>
									</Group>
								</Anchor>
								<Divider my={16} />
								<Group gap={4} c={'dimmed'}>
									<IconUserCircle stroke={1.8} size={18} />
									<Text size={'sm'}>{data?.job_name}</Text>
								</Group>
								<Divider my={16} />
								<Group gap={4} c={'dimmed'}>
									<IconCash stroke={1.8} size={18} />
									<Text size={'sm'}>
										{data?.salary
											? intlUSD.format(Number(data.salary)) +
												` ${t('jobs.fields.salary_text')}`
											: t('jobs.fields.salary_zero')}{' '}
									</Text>
								</Group>
								<Divider my={16} />
								<Group gap={4} c={'dimmed'}>
									<IconClock stroke={1.8} size={18} />
									<Text size={'sm'}>{data?.type_time}</Text>
								</Group>
								<Divider my={16} />
								<Group gap={4} c={'dimmed'}>
									<IconMapPin stroke={1.8} size={18} />
									<Text size={'sm'}>{data?.branch_name}</Text>
								</Group>
								<Divider my={16} />
								<ApplyForm mb={40} positionId={data?.job_id} />
							</Box>
						</Affix>
					</Flex>
				</Box>
			</Container>
		</section>
	);
};
