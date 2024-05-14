'use client';

import {
	Accordion,
	Affix,
	Anchor,
	AspectRatio,
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
	Modal,
	Overlay,
	SegmentedControl,
	SegmentedControlItem,
	Stack,
	Text,
	ThemeIcon,
	TypographyStylesProvider,
} from '@mantine/core';
import { TitleRender } from '../mantines/typographies/TitleRender';
import {
	IconBook,
	IconBrandFacebookFilled,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandX,
	IconChevronRight,
	IconClock,
	IconPlaystationTriangle,
} from '@tabler/icons-react';
import { imgCourses } from '@/assets/images/course';
import {
	useDisclosure,
	useMediaQuery,
	useScrollIntoView,
	useWindowScroll,
} from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import classes from './scss/course-detail.module.scss';
import { ICourse } from '@/types/course';
import { handleGetKeyYB } from '@/utils/format-string';

const segmentData: SegmentedControlItem[] = [
	{
		label: 'Giới thiệu',
		value: 'overview',
	},
	{
		label: 'Nội dung khoá học',
		value: 'outcomes',
	},
	{
		label: 'Giảng viên',
		value: 'instructor',
	},
];
interface Props {
	data?: ICourse;
	isMobile?: boolean;
}

export const CourseDetail = ({ data }: Props): JSX.Element => {
	const isMobile = useMediaQuery('(max-width: 62em)');
	const [showInfo, setShowInfo] = useState<string[]>([]);
	const [valueSegment, setValueSegment] = useState(segmentData[0].value);

	const [scroll] = useWindowScroll();
	const { scrollIntoView: scrollOverview, targetRef: overviewRef } =
		useScrollIntoView<HTMLDivElement>({
			offset: 130,
			duration: 300,
		});
	const { scrollIntoView: scrollOutcomes, targetRef: outcomesRef } =
		useScrollIntoView<HTMLDivElement>({
			offset: 130,
			duration: 300,
		});
	const { scrollIntoView: scrollInstructor, targetRef: instructorRef } =
		useScrollIntoView<HTMLDivElement>({
			offset: 130,
			duration: 300,
		});

	useEffect(() => {
		if (
			scroll.y <=
			overviewRef?.current?.offsetTop + overviewRef?.current?.clientHeight - 130
		) {
			setValueSegment(segmentData[0].value);
		} else if (
			scroll.y <=
			outcomesRef?.current?.offsetTop + outcomesRef?.current?.clientHeight - 140
		) {
			setValueSegment(segmentData[1].value);
		} else {
			setValueSegment(segmentData[2].value);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scroll]);

	return (
		<section>
			<Box>
				<Image
					src={imgCourses.banner}
					width={1920}
					height={650}
					w={'100%'}
					h={'auto'}
					loading="lazy"
					alt="banner course"
				/>
			</Box>
			<Container size="xl">
				<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
					<Grid gutter={32}>
						<Grid.Col span={{ base: 12, md: 8 }}>
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
									value={valueSegment}
									onChange={(value) => {
										switch (value) {
											case 'overview':
												scrollOverview();
												break;
											case 'outcomes':
												scrollOutcomes();
												break;
											case 'instructor':
												scrollInstructor();
												break;
										}
									}}
									styles={{
										innerLabel: {
											fontWeight: 'bold',
										},
									}}
									withItemsBorders={false}
									data={segmentData}
								/>
							</Affix>

							<Box pt={24} ref={overviewRef}>
								{/* <TitleRender order={3}>{'Bạn sẽ học được gì'}</TitleRender>
								<TypographyStylesProvider my={16}>
									<div
										dangerouslySetInnerHTML={{
											__html: data?.overview || '',
										}}
									/>
								</TypographyStylesProvider>

								<TitleRender order={3}>{'Kỹ năng bạn sẽ đạt được'}</TitleRender>
								<Group my={16}>
									<PillGroup size="md">
										{data?.skills_gain?.map((item, index) => (
											<Pill key={index} radius={'sm'}>
												{item}
											</Pill>
										))}
									</PillGroup>
								</Group>

								<TitleRender order={3}>{'Khoá học này dành cho'}</TitleRender>
								<TypographyStylesProvider my={16}>
									<div
										dangerouslySetInnerHTML={{
											__html: props?.who_need || '',
										}}
									/>
								</TypographyStylesProvider> */}

								<TypographyStylesProvider my={16}>
									<div
										dangerouslySetInnerHTML={{
											__html: data?.overview || '',
										}}
									/>
								</TypographyStylesProvider>
							</Box>

							<Box pt={24} ref={outcomesRef}>
								{/* <TitleRender order={3}>
									{'Xây dựng chuyên môn về chủ đề của bạn'}
								</TitleRender>
								<TypographyStylesProvider my={16}>
									<div
										dangerouslySetInnerHTML={{
											__html: props?.expertise || '',
										}}
									/>
								</TypographyStylesProvider>

								<TitleRender order={3}>
									{`Khoá học này gồm ${props?.courses.length} phần`}
								</TitleRender>
								<Spoiler
									showLabel="Xem thêm"
									hideLabel="Ẩn bớt"
									maxHeight={120}
									my={16}
								>
									<TypographyStylesProvider>
										<div
											dangerouslySetInnerHTML={{
												__html: props?.module_des || '',
											}}
										/>
									</TypographyStylesProvider>
								</Spoiler> */}
								<TypographyStylesProvider my={16}>
									<div
										dangerouslySetInnerHTML={{
											__html: data?.content || '',
										}}
									/>
								</TypographyStylesProvider>
								<Accordion py={16} radius={'md'} variant="contained" multiple>
									{data?.course_details?.map((item, index) => (
										<Accordion.Item
											key={item.course_detail_id}
											value={index?.toString()}
										>
											<Accordion.Control>
												<Flex justify="space-between" align={'center'}>
													<Stack gap={4}>
														<TitleRender order={4}>
															{item.name_detail}
														</TitleRender>
														<Text c={'dimmed'} fz={14}>
															Module {index + 1} • {item.total_time} phút để
															hoàn thành
														</Text>
													</Stack>
													<TitleRender
														order={4}
														c={'primary'}
														mr={4}
														textWrap="nowrap"
													>
														Xem thêm
													</TitleRender>
												</Flex>
											</Accordion.Control>
											<Accordion.Panel>
												{item.description}
												<TitleRender order={5} mt={16} mb={4}>
													{'Danh sách bài học'}
												</TitleRender>
												<Group gap={4} align="center" mb={8}>
													<IconPlaystationTriangle
														style={{ transform: 'rotate(90deg)' }}
														stroke={1}
													/>
													{(item.list_videos as string).split('|').length}{' '}
													videos
												</Group>
												<Anchor
													style={{ userSelect: 'none' }}
													onClick={() =>
														setShowInfo((prev) => {
															const i = prev.findIndex(
																(i) => i === index.toString(),
															);
															if (i < 0) return [...prev, index.toString()];
															return prev.filter((i) => i !== index.toString());
														})
													}
												>
													<Group gap={2} align="center">
														<IconChevronRight
															transform={
																showInfo.includes(index.toString())
																	? 'rotate(90)'
																	: ''
															}
															style={{ transition: '.3s' }}
														/>{' '}
														{showInfo.includes(index.toString())
															? 'Ẩn'
															: 'Hiển thị'}{' '}
														nội dung
													</Group>
												</Anchor>
												<Collapse in={showInfo.includes(index.toString())}>
													{(item.list_videos as string)
														.split('|')
														.map((video, index) => {
															const data = video.split(':');

															return (
																<React.Fragment key={index}>
																	<Flex
																		justify={'space-between'}
																		align={'center'}
																		py={8}
																	>
																		<Text fw={500}>{data[0]}</Text>
																		<Button variant="light" color={'cyan'}>
																			{data[1]} phút
																		</Button>
																	</Flex>

																	{(item.list_videos as string).split('|')
																		.length -
																		1 >
																		index && <Divider />}
																</React.Fragment>
															);
														})}
												</Collapse>
											</Accordion.Panel>
										</Accordion.Item>
									))}
								</Accordion>
							</Box>

							<Box pt={24} ref={instructorRef} pb={32}>
								<TitleRender order={3} mb={16}>
									{'Giảng viên'}
								</TitleRender>
								<Grid align={'center'}>
									<Grid.Col span={{ base: 12, md: 4 }}>
										<Image
											src={data?.instructor?.avatar}
											w={'100%'}
											h={'auto'}
											width={590}
											height={450}
											loading="lazy"
											alt={data?.instructor?.instructor_name}
										/>
									</Grid.Col>
									<Grid.Col span={{ base: 12, md: 8 }}>
										<Stack gap={4}>
											<TitleRender order={3}>
												{data?.instructor?.instructor_name}
											</TitleRender>
											<Text c={'primary'} fw={500} mb={4}>
												{data?.instructor?.major}
											</Text>
											<Group gap={4}>
												{data?.instructor?.fb_link && (
													<Anchor
														href={data?.instructor.fb_link}
														target="_blank"
														rel="noopener"
													>
														<ThemeIcon
															radius={'sm'}
															className={classes.icon}
															color="#e1e1e1"
														>
															<IconBrandFacebookFilled
																style={{ width: '70%', height: '70%' }}
																color="#222"
															/>
														</ThemeIcon>
													</Anchor>
												)}
												{data?.instructor?.x_link && (
													<Anchor
														href={data?.instructor.x_link}
														target="_blank"
														rel="noopener"
													>
														<ThemeIcon
															radius={'sm'}
															className={classes.icon}
															color="#e1e1e1"
														>
															<IconBrandX
																style={{ width: '70%', height: '70%' }}
																color="#222"
															/>
														</ThemeIcon>
													</Anchor>
												)}
												{data?.instructor?.ins_link && (
													<Anchor
														href={data?.instructor.ins_link}
														target="_blank"
														rel="noopener"
													>
														<ThemeIcon
															radius={'sm'}
															className={classes.icon}
															color="#e1e1e1"
														>
															<IconBrandInstagram
																style={{ width: '70%', height: '70%' }}
																color="#222"
																stroke={1.3}
															/>
														</ThemeIcon>
													</Anchor>
												)}
												{data?.instructor?.linkedin_link && (
													<Anchor
														href={data?.instructor.linkedin_link}
														target="_blank"
														rel="noopener"
													>
														<ThemeIcon
															radius={'sm'}
															className={classes.icon}
															color="#e1e1e1"
														>
															<IconBrandLinkedin
																style={{ width: '70%', height: '70%' }}
																color="#222"
																stroke={1.3}
															/>
														</ThemeIcon>
													</Anchor>
												)}
											</Group>
										</Stack>
									</Grid.Col>
								</Grid>
							</Box>
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 4 }}>
							<CoursePreview data={data} isMobile={isMobile} />
						</Grid.Col>
					</Grid>
				</Box>
			</Container>
		</section>
	);
};

function CoursePreview({ data, isMobile }: Props) {
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<Card shadow="xs" radius={'sm'} mt={isMobile ? 0 : -170}>
				<div className={classes.video} onClick={open}>
					<AspectRatio ratio={16 / 9} mx="auto">
						<Image
							width={319}
							height={184}
							radius={'md'}
							w={'100%'}
							h={'100%'}
							loading="lazy"
							src={data?.thumbnail}
							alt="about"
						/>
						<Overlay radius={'md'} opacity={0.35} />
					</AspectRatio>
				</div>

				<Flex gap={16} my={16}>
					<Text c="primary">
						<IconClock stroke={1.2} />
					</Text>

					<Text>{data?.course_details.length} tuần</Text>
				</Flex>

				<Divider />

				<Flex gap={16} my={16}>
					<Text c="primary">
						<IconBook stroke={1.2} />
					</Text>

					<Text>10 bài</Text>
				</Flex>
			</Card>

			<Modal
				opened={opened}
				onClose={close}
				size={'xl'}
				fullScreen
				zIndex={250}
			>
				<div>
					<AspectRatio ratio={16 / 9} mah={'calc(100vh - 100px)'}>
						<iframe
							width="100%"
							height="100%"
							data-pagefly-popup="true"
							allowFullScreen
							src={`https://www.youtube.com/embed/${handleGetKeyYB(
								data?.preview,
							)}?&amp;autoplay=1&amp;loop=0&amp;mute=0&amp;controls=1&amp;enablejsapi=1`}
						></iframe>
					</AspectRatio>
				</div>
			</Modal>
		</>
	);
}
