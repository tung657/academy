'use client';

import {
	Accordion,
	Affix,
	Anchor,
	Box,
	Button,
	Card,
	Collapse,
	Container,
	Divider,
	Flex,
	Grid,
	Group,
	Image,
	List,
	Pill,
	PillGroup,
	SegmentedControl,
	Spoiler,
	Stack,
	Text,
} from '@mantine/core';
import { TitleRender } from '../mantines/typographies/TitleRender';
import {
	IconChevronRight,
	IconLocationFilled,
	IconMailFilled,
	IconPhoneFilled,
	IconPlaystationTriangle,
} from '@tabler/icons-react';
import { imgCourses } from '@/assets/images/course';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';

export const CourseDetail = (): JSX.Element => {
	const isMobile = useMediaQuery('(max-width: 789px)');
	const [showInfo, setShowInfo] = useState<string>();

	return (
		<section>
			<Box>
				<Image
					src={imgCourses.banner}
					width={1920}
					height={650}
					w={'100%'}
					h={'auto'}
					alt="banner course"
				/>
			</Box>
			<Container size="xl">
				<Box pt={{ base: 40, lg: 60 }} pb={{ base: 30, md: 40, lg: 60 }}>
					<Grid gutter={32}>
						<Grid.Col span={{ base: 12, lg: 8 }}>
							<Affix
								withinPortal={false}
								style={{ position: 'sticky' }}
								position={{
									top: isMobile ? 75 : 85,
									left: 0,
								}}
							>
								<SegmentedControl
									w={'100%'}
									size="md"
									color="primary"
									styles={{
										innerLabel: {
											fontWeight: 'bold',
										},
									}}
									withItemsBorders={false}
									data={['Giới thiệu', 'Quá trình', 'Giảng viên']}
								/>
							</Affix>

							<Box py={24} id="#overview">
								<TitleRender order={3}>{"What you'll learn"}</TitleRender>
								<Stack my={16}>
									<Text>
										Build machine learning models in Python using popular
										machine learning libraries NumPy & scikit-learn
									</Text>
									<Text>
										Build & train supervised machine learning models for
										prediction & binary classification tasks, including linear
										regression & logistic regression
									</Text>
								</Stack>

								<TitleRender order={3}>{"Skills you'll gain"}</TitleRender>
								<Group my={16}>
									<PillGroup size="md">
										<Pill radius={'sm'}>Linear Regression</Pill>
										<Pill radius={'sm'}>
											Regularization to Avoid Overfitting
										</Pill>
										<Pill radius={'sm'}>
											Logistic Regression for Classification
										</Pill>
										<Pill radius={'sm'}>Gradient Descent</Pill>
										<Pill radius={'sm'}>Supervised Learning</Pill>
									</PillGroup>
								</Group>

								<TitleRender order={3}>{'Who this course is for'}</TitleRender>
								<Text my={16}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
									voluptatum eius minima dolores iste neque deleniti eum sed.
									Nam molestias ullam dicta numquam! Assumenda, molestias
									mollitia! Quod quam aliquam explicabo.
								</Text>
							</Box>

							<Box py={24} id="#outcomes">
								<TitleRender order={3}>
									{'Build your subject-matter expertise'}
								</TitleRender>
								<Stack my={16}>
									<Text>
										This course is part of the Machine Learning Specialization
										<br />
										When you enroll in this course, {"you'll"} also be enrolled
										in this Specialization.
									</Text>
									<List spacing={'sm'} withPadding>
										<List.Item>
											Learn new concepts from industry experts
										</List.Item>
										<List.Item>
											Gain a foundational understanding of a subject or tool
										</List.Item>
										<List.Item>
											Develop job-relevant skills with hands-on projects
										</List.Item>
										<List.Item>Earn a shareable career certificate</List.Item>
									</List>
								</Stack>

								<TitleRender order={3}>
									{'There are 3 modules in this course'}
								</TitleRender>
								<Spoiler
									showLabel="Xem thêm"
									hideLabel="Ẩn bớt"
									maxHeight={120}
									my={16}
								>
									<div aria-hidden="true">
										<div style={{ whiteSpace: 'pre-wrap' }}>
											<p>
												In the first course of the Machine Learning
												Specialization, you will:
											</p>
											<br />
											<p aria-hidden="false">
												• Build machine learning models in Python using popular
												machine learning libraries NumPy and scikit-learn.{' '}
												<br /> • Build and train supervised machine learning
												models for prediction and binary classification tasks,
												including linear regression and logistic regression{' '}
												<br />
												<br /> The Machine Learning Specialization is a
												foundational online program created in collaboration
												between DeepLearning.AI and Stanford Online. In this
												beginner-friendly program, you will learn the
												fundamentals of machine learning and how to use these
												techniques to build real-world AI applications.
												<br />
												<br /> This Specialization is taught by Andrew Ng, an AI
												visionary who has led critical research at Stanford
												University and groundbreaking work at Google Brain,
												Baidu, and Landing.AI to advance the AI field.
												<br />
												<br /> This 3-course Specialization is an updated and
												expanded version of Andrew’s pioneering Machine Learning
												course, rated 4.9 out of 5 and taken by over 4.8 million
												learners since it launched in 2012. <br />
												<br /> It provides a broad introduction to modern
												machine learning, including supervised learning
												(multiple linear regression, logistic regression, neural
												networks, and decision trees), unsupervised learning
												(clustering, dimensionality reduction, recommender
												systems), and some of the best practices used in Silicon
												Valley for artificial intelligence and machine learning
												innovation (evaluating and tuning models, taking a
												data-centric approach to improving performance, and
												more.)
												<br />
												<br /> By the end of this Specialization, you will have
												mastered key concepts and gained the practical know-how
												to quickly and powerfully apply machine learning to
												challenging real-world problems. If you’re looking to
												break into AI or build a career in machine learning, the
												new Machine Learning Specialization is the best place to
												start.
											</p>
										</div>
									</div>
								</Spoiler>
								<Accordion py={16} radius={'md'} variant="contained" multiple>
									<Accordion.Item value={'1'}>
										<Accordion.Control>
											<Flex justify="space-between" align={'center'}>
												<Stack gap={4}>
													<TitleRender order={4}>
														Week 1: Introduction to Machine Learning
													</TitleRender>
													<Text c={'dimmed'} fz={14}>
														Module 1 • 7 hours to complete
													</Text>
												</Stack>
												<TitleRender
													order={4}
													c={'blue'}
													mr={4}
													textWrap="nowrap"
												>
													Xem thêm
												</TitleRender>
											</Flex>
										</Accordion.Control>
										<Accordion.Panel>
											{`Welcome to the Machine Learning Specialization! You're
											joining millions of others who have taken either this or
											the original course, which led to the founding of
											Coursera, and has helped millions of other learners, like
											you, take a look at the exciting world of machine
											learning!`}
											<TitleRender order={5} mt={16} mb={4}>
												{"What's included"}
											</TitleRender>
											<Group gap={4} align="center" mb={8}>
												<IconPlaystationTriangle
													style={{ transform: 'rotate(90deg)' }}
													stroke={1}
												/>
												20 videos
											</Group>
											<Anchor
												onClick={() =>
													setShowInfo((prev) =>
														prev === '1' ? undefined : '1',
													)
												}
											>
												<Group gap={2} align="center">
													<IconChevronRight
														transform={showInfo === '1' ? 'rotate(90)' : ''}
														style={{ transition: '.3s' }}
													/>{' '}
													{showInfo === '1' ? 'Ẩn' : 'Hiển thị'} nội dung
												</Group>
											</Anchor>
											<Collapse in={!!showInfo}>
												<Flex justify={'space-between'} align={'center'} py={8}>
													<Text fw={500}>Welcome to machine learning!</Text>
													<Button variant="light" color={'cyan'}>
														2 minutes
													</Button>
												</Flex>
												<Divider />
												<Flex justify={'space-between'} align={'center'} py={8}>
													<Text fw={500}>Welcome to machine learning!</Text>
													<Button variant="light" color={'cyan'}>
														2 minutes
													</Button>
												</Flex>
											</Collapse>
										</Accordion.Panel>
									</Accordion.Item>
									<Accordion.Item value={'2'}>
										<Accordion.Control>
											<Flex justify="space-between" align={'center'}>
												<Stack gap={4}>
													<TitleRender order={4}>
														Week 2: Introduction to Machine Learning
													</TitleRender>
													<Text c={'dimmed'} fz={14}>
														Module 1 • 7 hours to complete
													</Text>
												</Stack>
												<TitleRender
													order={4}
													c={'blue'}
													mr={4}
													textWrap="nowrap"
												>
													Xem thêm
												</TitleRender>
											</Flex>
										</Accordion.Control>
										<Accordion.Panel>
											{`Welcome to the Machine Learning Specialization! You're
											joining millions of others who have taken either this or
											the original course, which led to the founding of
											Coursera, and has helped millions of other learners, like
											you, take a look at the exciting world of machine
											learning!`}
											<TitleRender order={5} mt={16} mb={4}>
												{"What's included"}
											</TitleRender>
											<Group gap={4} align="center" mb={8}>
												<IconPlaystationTriangle
													style={{ transform: 'rotate(90deg)' }}
													stroke={1}
												/>
												20 videos
											</Group>
											<Anchor
												onClick={() =>
													setShowInfo((prev) =>
														prev === '2' ? undefined : '2',
													)
												}
											>
												<Group gap={2} align="center">
													<IconChevronRight
														transform={showInfo === '2' ? 'rotate(90)' : ''}
														style={{ transition: '.3s' }}
													/>{' '}
													{showInfo === '2' ? 'Ẩn' : 'Hiển thị'} nội dung
												</Group>
											</Anchor>
											<Collapse in={!!showInfo}>
												<Flex justify={'space-between'} align={'center'} py={8}>
													<Text fw={500}>Welcome to machine learning!</Text>
													<Button variant="light" color={'cyan'}>
														2 minutes
													</Button>
												</Flex>
												<Divider />
												<Flex justify={'space-between'} align={'center'} py={8}>
													<Text fw={500}>Welcome to machine learning!</Text>
													<Button variant="light" color={'cyan'}>
														2 minutes
													</Button>
												</Flex>
											</Collapse>
										</Accordion.Panel>
									</Accordion.Item>
								</Accordion>
							</Box>
						</Grid.Col>
						<Grid.Col span={4} visibleFrom="lg">
							<Card shadow="xs" radius={'sm'} withBorder>
								<TitleRender order={3} fz={24} pb={8}>
									Contact Info
								</TitleRender>

								<Flex gap={16} my={16}>
									<Text c="primary">
										<IconPhoneFilled />
									</Text>

									<Anchor href="tel:21453545413" c="var(--mantine-color-text)">
										+2145 354 5413
									</Anchor>
								</Flex>

								<Divider />

								<Flex gap={16} my={16}>
									<Text c="primary">
										<IconMailFilled />
									</Text>

									<Anchor
										href="mailto:hello@tarn.com"
										c="var(--mantine-color-text)"
									>
										hello@tarn.com
									</Anchor>
								</Flex>

								<Divider />

								<Flex gap={16} mt={16}>
									<Text c="primary">
										<IconLocationFilled />
									</Text>

									<Text c="var(--mantine-color-text)">Ha Noi</Text>
								</Flex>
							</Card>
						</Grid.Col>
					</Grid>
				</Box>
			</Container>
		</section>
	);
};
