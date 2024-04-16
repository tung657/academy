'use client';

import {
	Anchor,
	Box,
	Card,
	Container,
	Divider,
	Flex,
	Grid,
	Image,
	List,
	Text,
	rem,
} from '@mantine/core';
import { prodDetailImgs } from './images';
import { TitleRender } from '../mantines/typographies/TitleRender';
import {
	IconLocationFilled,
	IconMailFilled,
	IconPhoneFilled,
	IconPointFilled,
} from '@tabler/icons-react';
import { useGetSlideById } from '@/utils';

export const ProductDetail = (): JSX.Element => {
	useGetSlideById({
		id: 1,
	});

	return (
		<section>
			<Container size="xl">
				<Box
					pt={{ base: 60, md: 80, lg: 100 }}
					pb={{ base: 30, md: 40, lg: 60 }}
				>
					<Grid gutter={32}>
						<Grid.Col span={{ base: 12, lg: 8 }}>
							<Image
								src={prodDetailImgs.project2}
								loading="lazy"
								w={'100%'}
								h={'auto'}
								width={750}
								height={450}
								fit="cover"
								radius={rem(5)}
								alt="Product detail"
							/>

							<Text c="primary" fw={600} py={16}>
								AI & ML Development
							</Text>

							<TitleRender order={3} fz={28} pb={8}>
								About this Services
							</TitleRender>

							<Text c="dimmed" fw={500}>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
								pariatur, praesentium expedita fugiat minus aspernatur
								architecto magni reprehenderit eaque quod soluta cum modi iste,
								harum at libero distinctio quisquam sed?
							</Text>

							<Grid gutter={16} my={16}>
								<Grid.Col span={{ base: 12, sm: 6 }}>
									<Image
										loading="lazy"
										width={750}
										height={600}
										w={'100%'}
										h={'auto'}
										radius={rem(5)}
										src={prodDetailImgs.project2}
										alt="project"
									/>
								</Grid.Col>
								<Grid.Col span={{ base: 12, sm: 6 }}>
									<TitleRender order={3} fz={24} pb={8}>
										Important Facts
									</TitleRender>

									<List
										size="lg"
										icon={
											<Flex align={'center'} justify={'center'} h={'100%'}>
												<IconPointFilled color="var(--mantine-color-primary-filled)" />
											</Flex>
										}
										spacing={12}
									>
										{[...Array(5)].map((_, index) => (
											<List.Item key={index}>
												The Field of Data Science
											</List.Item>
										))}
									</List>
								</Grid.Col>

								<Grid.Col>
									<Text fw={500} c="dimmed">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										Cupiditate dolorum quo voluptatem officia, totam laboriosam
										alias suscipit pariatur praesentium accusamus autem nisi
										architecto earum, tempore impedit ipsum fugit eligendi
										dolore?
									</Text>
								</Grid.Col>
							</Grid>

							<TitleRender order={3} fz={28} pb={8}>
								Technologies That We Use
							</TitleRender>
							<Grid>
								{[...Array(12)].map((_, index) => (
									<Grid.Col key={index} span={{ base: 6, xs: 4, sm: 3 }}>
										<List
											size="md"
											icon={
												<Flex align={'center'} justify={'center'} h={'100%'}>
													<IconPointFilled color="var(--mantine-color-primary-filled)" />
												</Flex>
											}
										>
											<List.Item key={index} fw={400}>
												Python
											</List.Item>
										</List>
									</Grid.Col>
								))}
							</Grid>
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
