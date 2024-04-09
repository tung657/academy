'use client';
import {
	Box,
	Container,
	Flex,
	Grid,
	Image,
	Text,
	Timeline,
} from '@mantine/core';
import classes from './scss/course.module.scss';
import { imgHome } from '@/assets/images/home';

import { TitleCombo } from '../typographies/TitleCombo';
import {
	IconGitBranch,
	IconGitCommit,
	IconGitPullRequest,
	IconMessageDots,
} from '@tabler/icons-react';

export function CourseBanner() {
	return (
		<section className={classes.section}>
			<Container size="md">
				<Box
					pt={{ base: 60, md: 80, lg: 100 }}
					pb={{ base: 30, md: 40, lg: 60 }}
				>
					<TitleCombo
						titleSub="OUR HISTORY"
						titleChildren={'History Begins in 2010'}
					/>
					<Grid mt={24} gutter={24}>
						<Grid.Col span={{ base: 12, sm: 4 }}>
							<Timeline active={1} bulletSize={24} lineWidth={2}>
								<Timeline.Item
									className={classes.timeline}
									bullet={<IconGitBranch size={12} />}
									title="New branch"
								>
									<Text size="xs" mt={4} td="underline">
										2010
									</Text>
									<Text size="xs" mt={4} td="underline">
										February 20th
									</Text>
									<Flex
										className={classes.imgBox}
										align={'center'}
										justify={'center'}
										gap={'sm'}
									>
										<Text c="dimmed" size="lg" w={'500'}>
											Real innovations and a positive customer experience are
											the heart of successful communication. Lorem ipsum dolor
											sit amet, sectetur adipiscing elit, tempor incididunt ut
											labore et dolore magna.
										</Text>
										<Image
											className={classes.img}
											src={imgHome.history}
											alt="image"
											width={500}
											height={500}
											w="280px"
											h="240px"
											radius={'xl'}
											loading="lazy"
											decoding="async"
											style={{ color: 'transparent' }}
										/>
									</Flex>
								</Timeline.Item>

								<Timeline.Item
									className={classes.timeline}
									bullet={<IconGitCommit size={12} />}
									title="Global Success"
								>
									<Text size="xs" mt={4} td="underline">
										2023
									</Text>
									<Text size="xs" mt={4} td="underline">
										January 14th
									</Text>
									<Flex
										className={classes.imgBox}
										align={'center'}
										justify={'center'}
										gap={'sm'}
									>
										<Text c="dimmed" size="lg" w={'500'}>
											Real innovations and a positive customer experience are
											the heart of successful communication. Lorem ipsum dolor
											sit amet, sectetur adipiscing elit, tempor incididunt ut
											labore et dolore magna.
										</Text>
										<Image
											className={classes.img}
											src={imgHome.howitswork}
											alt="image"
											width={500}
											height={500}
											w="280px"
											h="240px"
											radius={'xl'}
											loading="lazy"
											decoding="async"
											style={{ color: 'transparent' }}
										/>
									</Flex>
								</Timeline.Item>

								<Timeline.Item
									className={classes.timeline}
									title="Pull request"
									bullet={<IconGitPullRequest size={12} />}
									lineVariant="dashed"
								>
									<Text size="xs" mt={4} td="underline">
										2010
									</Text>
									<Text size="xs" mt={4} td="underline">
										February 20th
									</Text>
									<Flex
										className={classes.imgBox}
										align={'center'}
										justify={'center'}
										gap={'sm'}
									>
										<Text c="dimmed" size="lg" w={'500'}>
											Real innovations and a positive customer experience are
											the heart of successful communication. Lorem ipsum dolor
											sit amet, sectetur adipiscing elit, tempor incididunt ut
											labore et dolore magna.
										</Text>
										<Image
											className={classes.img}
											src={imgHome.howitswork}
											alt="image"
											width={500}
											height={500}
											w="280px"
											h="240px"
											radius={'xl'}
											loading="lazy"
											decoding="async"
											style={{ color: 'transparent' }}
										/>
									</Flex>
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
									<Flex
										className={classes.imgBox}
										align={'center'}
										justify={'center'}
										gap={'sm'}
									>
										<Text c="dimmed" size="lg" w={'500'}>
											Real innovations and a positive customer experience are
											the heart of successful communication. Lorem ipsum dolor
											sit amet, sectetur adipiscing elit, tempor incididunt ut
											labore et dolore magna.
										</Text>
										<Image
											className={classes.img}
											src={imgHome.howitswork}
											alt="image"
											width={500}
											height={500}
											w="280px"
											h="240px"
											radius={'xl'}
											loading="lazy"
											decoding="async"
											style={{ color: 'transparent' }}
										/>
									</Flex>
								</Timeline.Item>
							</Timeline>
						</Grid.Col>
					</Grid>
				</Box>
			</Container>
		</section>
	);
}
