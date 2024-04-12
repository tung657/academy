'use client';
import {
	Box,
	Card,
	Container,
	Grid,
	Image,
	Text,
	Timeline,
} from '@mantine/core';
import classes from './scss/howitswork.module.scss';
import { imgHome } from '@/assets/images/home';

import {
	IconGitBranch,
	IconGitCommit,
	IconGitPullRequest,
	IconMessageDots,
} from '@tabler/icons-react';
import { TitleCombo } from '../mantines/typographies/TitleCombo';

export function HowItsWork() {
	return (
		<section className={classes.section}>
			<Container size="md">
				<Box
					pt={{ base: 60, md: 80, lg: 100 }}
					pb={{ base: 30, md: 40, lg: 60 }}
				>
					<TitleCombo
						titleSub="PEOPLE LOVE US"
						titleChildren={'Why Choose Us?'}
					/>
					<Grid mt={24} gutter={24}>
						<Grid.Col span={{ base: 12, lg: 6 }}>
							<Timeline active={1} bulletSize={24} lineWidth={2}>
								<Timeline.Item
									className={classes.timeline}
									bullet={<IconGitBranch size={12} />}
									title="Data for All Your People"
								>
									<Text size="xs" mt={4} td="underline">
										2010
									</Text>
									<Text size="xs" mt={4} td="underline">
										February 20th
									</Text>

									<Text c="dimmed" size="sm">
										Dolor sit amet consectetur elit eiusmod tempor incidi dunt
										labore dolore magna aliqua enim.
									</Text>
								</Timeline.Item>

								<Timeline.Item
									className={classes.timeline}
									bullet={<IconGitCommit size={12} />}
									title="A New Breed of AI"
								>
									<Text size="xs" mt={4} td="underline">
										2023
									</Text>
									<Text size="xs" mt={4} td="underline">
										January 14th
									</Text>

									<Text c="dimmed" size="sm">
										Dolor sit amet consectetur elit eiusmod tempor incidi dunt
										labore dolore magna aliqua enim.
									</Text>
								</Timeline.Item>

								<Timeline.Item
									className={classes.timeline}
									title="Analytics Business"
									bullet={<IconGitPullRequest size={12} />}
									lineVariant="dashed"
								>
									<Text size="xs" mt={4} td="underline">
										2010
									</Text>
									<Text size="xs" mt={4} td="underline">
										February 20th
									</Text>

									<Text c="dimmed" size="sm">
										Dolor sit amet consectetur elit eiusmod tempor incidi dunt
										labore dolore magna aliqua enim.
									</Text>
								</Timeline.Item>

								<Timeline.Item
									className={classes.timeline}
									title="Code review"
									bullet={<IconMessageDots size={12} />}
								>
									<Text size="xs" mt={4} td="underline">
										2010
									</Text>
									<Text size="xs" mt={4} td="underline">
										February 20th
									</Text>

									<Text c="dimmed" size="sm">
										Dolor sit amet consectetur elit eiusmod tempor incidi dunt
										labore dolore magna aliqua enim.
									</Text>
								</Timeline.Item>
							</Timeline>
						</Grid.Col>
						<Grid.Col span={{ base: 12, lg: 6 }}>
							<Card className={classes.imgBox} shadow="md" h={'100%'} mih={750}>
								<Image
									className={classes.img}
									src={imgHome.history}
									alt="image"
									width={500}
									height={500}
									w="500px"
									h="500px"
									radius={'xl'}
									loading="lazy"
									decoding="async"
									style={{ color: 'transparent' }}
								/>
							</Card>
						</Grid.Col>
					</Grid>
				</Box>
			</Container>
		</section>
	);
}
