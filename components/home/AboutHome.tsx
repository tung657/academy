'use client';

import { Box, Grid, Image, Text } from '@mantine/core';
import classes from './scss/solution.module.scss';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { imgHome } from '@/assets/images/home';
import { ScrollMotion } from '../shared/motion/ScrollMotion';

export const AboutHome = (): JSX.Element => {
	return (
		<section className={classes.section} id="about-us">
			<Box pt={{ base: 20, md: 30, lg: 30 }} pb={{ base: 30, md: 40, lg: 60 }}>
				<Grid mt={24} gutter={{ base: 24, md: 64 }} align="center">
					<Grid.Col span={{ base: 12, md: 6 }}>
						<ScrollMotion isY>
							<TitleRender order={2} pb={16}>
								Chúng tôi là Viện trí tuệ nhân tạo Việt Nam
							</TitleRender>
						</ScrollMotion>
						<ScrollMotion isX>
							<Text pb={16} ta={'justify'}>
								Viện trí tuệ nhân tạo Việt Nam là tập thể những con người với
								lòng nhiệt huyết và khát vọng mang đến thị trường sự sáng tạo và
								đổi mới. Chúng tôi là đội ngũ lớn mạnh tự tin với năng lực công
								nghệ, sản phẩm và chất lượng dịch vụ. Trải qua hơn 5 năm hình
								thành và phát triển, Viện Trí tuệ nhân tạo Việt Nam vẫn luôn
								khẳng định vai trò tiên phong trong lĩnh vực AI và chuyển đổi số
								tại Việt Nam, đồng hành cùng với đó là đội ngũ chuyên gia hàng
								đầu trong lĩnh vực. Chúng tôi không ngừng cố gắng, không ngừng
								nỗ lực để đáp ứng mọi nhu cầu của khách hàng, mang đến khách
								hàng những trải nghiệm sản phẩm và dịch vụ tốt nhất.
							</Text>
						</ScrollMotion>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 6 }}>
						<ScrollMotion isX={16}>
							<Image
								src={imgHome.aboutMember}
								width={2000}
								height={1600}
								loading="lazy"
								w={'100%'}
								h={'auto'}
								alt="about us"
							/>
						</ScrollMotion>
					</Grid.Col>
				</Grid>
			</Box>
		</section>
	);
};
