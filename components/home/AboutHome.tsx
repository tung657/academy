'use client';

import { Box, Grid, Image, Text } from '@mantine/core';
import classes from './scss/solution.module.scss';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { imgHome } from '@/assets/images/home';

export const AboutHome = (): JSX.Element => {
	return (
		<section className={classes.section} id="about-us">
			<Box pt={{ base: 20, md: 30, lg: 30 }} pb={{ base: 30, md: 40, lg: 60 }}>
				<Grid mt={24} gutter={{ base: 24, md: 64 }} align="center">
					<Grid.Col span={{ base: 12, md: 6 }}>
						<TitleRender order={2} pb={16}>
							Chúng tôi là AIA
						</TitleRender>
						<Text pb={16}>
							Được thành lập vào năm 2008, AIA là một trong số ít những doanh
							nghiệp Việt Nam đầu tiên thành công trong việc phát triển những
							phần mềm mã nguồn mở, phục vụ hàng trăm ngàn khách hàng trên khắp
							thế giới. Chúng tôi tự hào có được một đội ngũ trẻ, chuyên nghiệp
							và chuyên sâu về lĩnh vực lập trình, thiết kế và marketing.
						</Text>
						<Text pb={16}>
							Ai trong chúng tôi cũng có một niềm đam mê lớn với công nghệ, nỗ
							lực không ngừng để chăm sóc khách hàng và đạt được mơ ước xây dựng
							và mang đến những sản phẩm tiên tiến nhất cho thế giới.
						</Text>
						<Text fz={22} fw={700} c={'primary'}>
							“Brave to be remarkable!”
						</Text>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 6 }}>
						<Image
							src={imgHome.aboutMember}
							width={2000}
							height={1600}
							w={'100%'}
							h={'auto'}
							alt="about us"
						/>
					</Grid.Col>
				</Grid>
			</Box>
		</section>
	);
};
