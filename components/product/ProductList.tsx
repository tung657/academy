'use client';

import { useState } from 'react';

import { Box, Container, Divider, Grid, Image, Text } from '@mantine/core';

import classes from './scss/product.module.scss';

import { SEARCH_PAGE, SEARCH_SIZE, getUrlDetail } from '@/utils';
import Link from 'next/link';
import { PRODUCT_DETAIL_URL } from '@/libs/urls';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { IconArrowRight } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';

import { dataCourses } from '../course/data/data-fake';
import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { imgHome } from '@/assets/images/home';

export const ProductList = (): JSX.Element => {
	const searchParams = useSearchParams();

	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 1;

	const [dataPagination] = useState(
		dataCourses.slice((+page - 1) * +pageSize, +pageSize * +page),
	);
	// const theme = useMantineTheme();

	// const handleChangePagination = (page: number, pageSizeNew?: number) => {
	// 	const current = new URLSearchParams(searchParams.toString());

	// 	const data = dataCourses.slice(
	// 		(page - 1) * (pageSizeNew || +pageSize),
	// 		(pageSizeNew || +pageSize) * page,
	// 	);

	// 	current.set(SEARCH_PAGE, page.toString());
	// 	pageSizeNew && current.set(SEARCH_SIZE, pageSizeNew.toString());

	// 	setDataPagination(data);

	// 	router.push(`${pathname}?${current}`);
	// 	router.refresh();
	// };
	return (
		<section className={classes.section}>
			{dataPagination.map((item) => (
				<Box key={item.id} pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
					<Container size="xl">
						<Grid mt={24} gutter={{ base: 24, md: 64 }} align="center">
							<Grid.Col span={{ base: 12, md: 6 }}>
								<TitleRender order={2} pb={16} pl={16}>
									Giải pháp xây trang tập trung vào tối ưu chuyển đổi
								</TitleRender>
								<Text pb={16} pl={16}>
									PageFly là bộ công cụ hoàn thiện nhất trên nền tảng Shopify để
									tối ưu chuyển đổi cho doanh nghiệp. Đây là sản phẩm tiên phong
									của BraveBits với định hướng phát triển cho mọi nền tảng
									thương mại điện tử.
								</Text>
								<Link
									className={classes.title}
									href={getUrlDetail(PRODUCT_DETAIL_URL, item.id)}
								>
									<ButtonBubble
										ml={16}
										variant="filled"
										size="md"
										leftSection={<IconArrowRight />}
									>
										Home
									</ButtonBubble>
								</Link>
							</Grid.Col>
							<Grid.Col span={{ base: 12, md: 6 }}>
								<Image
									src={imgHome.product1}
									width={617}
									height={389}
									w={'100%'}
									h={'auto'}
									alt="about us"
								/>
							</Grid.Col>
						</Grid>
						<Divider />
						<Grid mt={24} gutter={{ base: 24, md: 64 }} align="center">
							<Grid.Col pt={100} pb={100} span={{ base: 12, md: 6 }}>
								<Image
									src={imgHome.product2}
									width={508}
									height={358}
									w={'100%'}
									h={'auto'}
									alt="about us"
								/>
							</Grid.Col>
							<Grid.Col span={{ base: 12, md: 6 }}>
								<Text fz={22} fw={700} c={'primary'} pb={16} pl={16}>
									Tập trung vào Khách hàng
								</Text>
								<TitleRender order={2} pb={16} pl={16}>
									Sản phẩm đặt khách hàng làm trọng tâm
								</TitleRender>
								<Text pb={16} pl={16}>
									Chúng tôi không bán sản phẩm mà đồng hành, giúp khách hàng
									tiến đến thành công trên con đường kinh doanh của họ.
								</Text>
								<Text pb={16} pl={16}>
									Khách hàng chính là người quyết định sứ mệnh và định hướng cho
									sản phẩm và dịch vụ của chúng tôi. Sự thành công của khách
									hàng chính là sự thành công của chúng tôi.
								</Text>
								<Link
									className={classes.title}
									href={getUrlDetail(PRODUCT_DETAIL_URL, item.id)}
								>
									<ButtonBubble
										ml={16}
										variant="filled"
										size="md"
										leftSection={<IconArrowRight />}
									>
										Home
									</ButtonBubble>
								</Link>
							</Grid.Col>
						</Grid>
						<Grid mt={24} gutter={{ base: 24, md: 64 }} align="center">
							<Grid.Col span={{ base: 12, md: 6 }}>
								<Text fz={22} fw={700} c={'primary'} pb={16} pl={16}>
									Ứng dụng công nghệ cao
								</Text>
								<TitleRender order={2} pb={16} pl={16}>
									Kiến trúc phần mềm linh hoạt được xây dựng bởi công nghệ tân
									tiến
								</TitleRender>
								<Text pb={16} pl={16}>
									Để tạo ra một trải nghiệm xây trang mượt mà nhất cho khách
									hàng, BraveBits đã ứng dụng hàng loạt các công nghệ cao cấp
									như React & React Hooks, NodeJS, Ant Design và MongoDB.
								</Text>
								<Text pb={16} pl={16}>
									Những công nghệ này cũng giúp chúng tôi tập trung nguồn lực
									vào những yếu tố quan trọng, tối ưu chi phí phát triển 1 cách
									tổng thể.
								</Text>
								<Link
									className={classes.title}
									href={getUrlDetail(PRODUCT_DETAIL_URL, item.id)}
								>
									<ButtonBubble
										ml={16}
										variant="filled"
										size="md"
										leftSection={<IconArrowRight />}
									>
										Home
									</ButtonBubble>
								</Link>
							</Grid.Col>

							<Grid.Col span={{ base: 12, md: 6 }}>
								<Image
									src={imgHome.product3}
									width={470}
									height={314}
									w={'100%'}
									h={'auto'}
									alt="about us"
								/>
							</Grid.Col>
						</Grid>
						<Grid mt={24} gutter={{ base: 24, md: 64 }} align="center">
							<Grid.Col pt={100} span={{ base: 12, md: 6 }}>
								<Image
									src={imgHome.product4}
									width={392}
									height={292}
									w={'100%'}
									h={'auto'}
									alt="about us"
								/>
							</Grid.Col>
							<Grid.Col span={{ base: 12, md: 6 }}>
								<Text fz={22} fw={700} c={'primary'} pb={16} pl={16}>
									Trải nghiệm khách hàng đẳng cấp quốc tế
								</Text>
								<TitleRender order={2} pb={16} pl={16}>
									Một trải nghiệm cao cấp, xứng tầm quốc tế
								</TitleRender>
								<Text pb={16} pl={16}>
									Trong quá trình phát triển, BraveBits xây dựng sản phẩm với
									tiêu chí hàng đầu là trải nghiệm dễ dàng cho khách hàng, đáp
									ứng được mọi nhu cầu của thị trường toàn cầu. Chính vì vậy,
									chúng tôi đặc biệt tập trung vào những tính năng như Chăm sóc
									khách hàng 24/7, hỗ trợ trực tiếp trong ứng dụng và hướng dẫn
									sử dụng chi tiết cho khách hàng mới.
								</Text>
								<Link
									className={classes.title}
									href={getUrlDetail(PRODUCT_DETAIL_URL, item.id)}
								>
									<ButtonBubble
										ml={16}
										variant="filled"
										size="md"
										leftSection={<IconArrowRight />}
									>
										Home
									</ButtonBubble>
								</Link>
							</Grid.Col>
						</Grid>
					</Container>
				</Box>
			))}
		</section>
	);
};
