'use client';
import { Box, Container, Flex, Grid } from '@mantine/core';
import { TitleCombo } from '../mantines/typographies/TitleCombo';
import React from 'react';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { IconBrain, IconDiamond, IconMedal2 } from '@tabler/icons-react';
import { ScrollMotion } from '../shared/motion/ScrollMotion';

const dataCores = [
	{
		title: 'Tâm thế của kẻ thắng không bao giờ thua',
		content:
			'Tại AIA, những thử thách mới luôn là cơ hội để thử lòng dũng cảm và quyết tâm. Đội ngũ của công ty là những cá nhân quyết đoán, không ngại khó khăn, cùng nhau nỗ lực vượt qua những chướng ngại vật trên con đường phát triển sản phẩm cho thị trường quốc tế. Tâm thế bất khuất và dũng cảm này là một trong những giá trị cốt lõi quan trọng nhất của mỗi BBer.',
		icon: (
			<IconMedal2
				size={58}
				stroke={1.2}
				color="var(--mantine-color-primary-filled)"
			/>
		),
	},
	{
		title: 'Tâm thế của người mới, không ngừng học hỏi',
		content:
			'Trong thế giới phát triển không ngừng ngày nay, những điều chúng ta biết ngày hôm nay có thể nhanh chóng trở nên lỗi thời ngày mai. Các BBer không bao giờ chủ quan với tâm thế của một kẻ biết tuốt, vì điều đó chỉ có thể dẫn đến sự tụt hậu. Chúng tôi tự hào khoác lên mình chiếc áo học sinh để luôn khám phá những lựa chọn và cơ hội mới với niềm tin rằng sẽ luôn có nhiều giải pháp cho mọi vấn.',
		icon: (
			<IconBrain
				size={58}
				stroke={1.2}
				color="var(--mantine-color-primary-filled)"
			/>
		),
	},
	{
		title: 'Tập trung vào kết quả, không phải công việc',
		content:
			'Tại AIA, khi được giao 1 nhiệm vụ, chúng luôn hỏi tự hỏi “Tôi muốn đạt được kết quả gì và nó sẽ đóng góp cho sự phát triển của công ty như thế nào?”. Thái độ không phù hợp là: “Tôi chỉ cần hoàn thành nhiệm vụ này là được rồi, còn lại sẽ có ai đó lo tiếp”. Điều quan trọng nhất đối với công ty là tăng trưởng và điểu đó chỉ có thể khi tất cả thành viên tạo ra những kết quả có đóng góp cao.',
		icon: (
			<IconDiamond
				size={58}
				stroke={1.2}
				color="var(--mantine-color-primary-filled)"
			/>
		),
	},
];

export const MissionValue = (): JSX.Element => {
	return (
		<>
			<section className="background-secondary">
				<Container size="xl">
					<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
						<TitleCombo
							titleChildren={'Sứ mệnh của chúng tôi'}
							description="Sứ mệnh của chúng tôi là trở thành đòn bẩy cho sức trẻ Việt Nam để khám phá những tiềm năng và đạt thành công trên trường quốc tế. Con đường chúng tôi chọn dù còn nhiều chông gai, nhưng với những gì “thế giới phẳng” mang lại, đây là cơ hội vàng để các tài năng tỏa sáng."
						/>
					</Box>
				</Container>
			</section>
			<section>
				<Container size="xl">
					<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
						<TitleCombo needWrapper={false} titleChildren={'Giá trị cốt lõi'} />
						<Grid gutter={16} mt={'lg'}>
							{dataCores.map((item, index) => (
								<React.Fragment key={index}>
									<Grid.Col span={{ base: 12, sm: 4 }}>
										<ScrollMotion isX>
											<Flex gap={8}>
												{item.icon}
												<TitleRender order={3} fz={{ base: 'h4', lg: 'h3' }}>
													{item.title}
												</TitleRender>
											</Flex>
										</ScrollMotion>
									</Grid.Col>
									<Grid.Col span={{ base: 12, sm: 8 }}>
										<ScrollMotion isX={50}>{item.content}</ScrollMotion>
									</Grid.Col>
								</React.Fragment>
							))}
						</Grid>
					</Box>
				</Container>
			</section>
		</>
	);
};
