'use client';

import {
	Anchor,
	Box,
	Button,
	Card,
	Center,
	Container,
	Flex,
	Group,
	Image,
	Stack,
	Text,
	rem,
} from '@mantine/core';
import { useTranslations } from 'next-intl';

import { imgOthers } from '@/assets/images/others';
import backgroundImg from '@/assets/images/others/breadcrumb-bg.jpg';
import { Link } from '@/libs/i18n-navigation';
import { JOB_DETAIL_URL } from '@/libs/urls';
import { IBaseResponse } from '@/types';
import { IJob } from '@/types/job';
import { intlUSD } from '@/utils/format-number';
import { getUrlDetail } from '@/utils/format-string';

import { TitleRender } from '../mantines/typographies/TitleRender';
import { ScrollMotion } from '../shared/motion/ScrollMotion';
import classes from './scss/job-list.module.scss';

interface Props {
	data: IBaseResponse<IJob[]>;
}

export const JobList = ({ data }: Props): JSX.Element => {
	const t = useTranslations();

	return (
		<>
			<section
				style={{ backgroundImage: `url(${backgroundImg.src})` }}
				className={classes.section}
			>
				<Container size="xl">
					<Stack
						align="center"
						mx={'auto'}
						pt={{ base: rem(60), md: rem(70), lg: rem(100) }}
						pb={{ base: rem(60), md: rem(70), lg: rem(100) }}
						w={{ md: '70%', lg: '50%' }}
					>
						<ScrollMotion isY once>
							<TitleRender order={1} fz={'h1'}>
								{t('jobs.title')}
							</TitleRender>
						</ScrollMotion>
						<ScrollMotion isY once delay={0.2}>
							<Text ta={'center'}>{t('jobs.description')}</Text>
						</ScrollMotion>
					</Stack>
				</Container>

				<div className={classes.shape1}>
					<Image
						src={imgOthers.shape1}
						alt="shape 1"
						width={22}
						height={22}
						loading="lazy"
					/>
				</div>
				<div className={classes.shape2}>
					<Image
						src={imgOthers.shape2}
						alt="shape 2"
						width={202}
						height={202}
						loading="lazy"
					/>
				</div>
			</section>
			<section>
				<Container size="xl">
					<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
						<Center style={{ flexDirection: 'column' }}>
							{data?.data?.map((job, index) => (
								<Box key={job.job_id} w={{ lg: '80%' }}>
									<ScrollMotion isY delay={0.2 * index}>
										<Card shadow="md" mb={16} px={40} py={24}>
											<Flex align={'center'} justify={'space-between'}>
												<Group>
													<Image
														src={job.icon}
														alt={job.job_name}
														w={80}
														h={'auto'}
														width={550}
														height={419}
														loading="lazy"
													/>

													<div>
														<TitleRender order={3} tt={'capitalize'}>
															{job.job_name}
														</TitleRender>
														<Text>
															{[
																job.type_time,
																'Làm việc tại ' + job.branch_name,
																intlUSD.format(Number(job.salary)) + '+ VND',
															].join(' • ')}
														</Text>
													</div>
												</Group>

												<Anchor
													component={Link}
													href={getUrlDetail(JOB_DETAIL_URL, job.job_id)}
												>
													<Button radius={'xl'}>
														{t('global.see_details')}
													</Button>
												</Anchor>
											</Flex>
										</Card>
									</ScrollMotion>
								</Box>
							))}
						</Center>
					</Box>
				</Container>
			</section>
		</>
	);
};
