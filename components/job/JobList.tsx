'use client';

import {
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

import backgroundImg from '@/assets/images/others/breadcrumb-bg.jpg';
import classes from './scss/job-list.module.scss';
import { imgOthers } from '@/assets/images/others';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { dataJobs } from './data/data-fake';
import { intlUSD } from '@/utils/format-number';
import { Link } from '@/libs/i18n-navigation';
import { useTranslations } from 'next-intl';
import { getUrlDetail } from '@/utils';
import { JOB_DETAIL_URL } from '@/libs/urls';

export const JobList = (): JSX.Element => {
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
						<TitleRender order={1} fz={'h1'}>
							{t('job.title')}
						</TitleRender>
						<Text ta={'center'}>{t('job.description')}</Text>
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
							{dataJobs.map((job) => (
								<Card
									key={job.id}
									shadow="md"
									mb={16}
									w={{ lg: '80%' }}
									px={40}
									py={24}
								>
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
														job.duration,
														'Làm việc tại ' + job.location,
														intlUSD.format(job.salary) + '+ VND',
													].join(' • ')}
												</Text>
											</div>
										</Group>

										<Link href={getUrlDetail(JOB_DETAIL_URL, job.id)}>
											<Button radius={'xl'}>{t('global.see_details')}</Button>
										</Link>
									</Flex>
								</Card>
							))}
						</Center>
					</Box>
				</Container>
			</section>
		</>
	);
};
