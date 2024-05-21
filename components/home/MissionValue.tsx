'use client';

import { Box, Container, Flex, Stack, Text } from '@mantine/core';
import { TitleCombo } from '../mantines/typographies/TitleCombo';
import React from 'react';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { IconBrain, IconDiamond } from '@tabler/icons-react';
import { ScrollMotion } from '../shared/motion/ScrollMotion';

const dataCores = [
	{
		title: 'Kỷ luật',
		content:
			'Là chìa khóa để mỗi cá nhân rèn luyện bản thân, chăm chỉ làm việc và mang lại giá trị cho doanh nghiệp. Sự phát triển và rèn luyện tính kỷ luật giúp Viện trí tuệ nhân tạo Việt Nam có nền tảng phát triển văn hóa, con người và năng suất bền vững. ',
		icon: (
			<IconDiamond
				size={56}
				stroke={1.2}
				color="var(--mantine-color-primary-filled)"
			/>
		),
	},
	{
		title: 'Đồng tâm',
		content:
			'Là sự tôn trọng, tình bằng hữu, sự đoàn kết. Viện trí tuệ nhân tạo Việt Nam như một đại gia đình, yêu thương, che chở, bảo vệ lẫn nhau, thấm nhuần tinh thần đồng cam cộng khổ, sát cánh vì mục tiêu chung..',
		icon: (
			<IconBrain
				size={56}
				stroke={1.2}
				color="var(--mantine-color-primary-filled)"
			/>
		),
	},
	// {
	// 	title: 'Tập trung vào kết quả, không phải công việc',
	// 	content:
	// 		'Tại AIA, khi được giao 1 nhiệm vụ, chúng luôn hỏi tự hỏi “Tôi muốn đạt được kết quả gì và nó sẽ đóng góp cho sự phát triển của công ty như thế nào?”. Thái độ không phù hợp là: “Tôi chỉ cần hoàn thành nhiệm vụ này là được rồi, còn lại sẽ có ai đó lo tiếp”. Điều quan trọng nhất đối với công ty là tăng trưởng và điểu đó chỉ có thể khi tất cả thành viên tạo ra những kết quả có đóng góp cao.',
	// 	icon: (
	// 		<IconDiamond
	// 			size={58}
	// 			stroke={1.2}
	// 			color="var(--mantine-color-primary-filled)"
	// 		/>
	// 	),
	// },
];

export const MissionValue = (): JSX.Element => {
	return (
		<>
			<section className="background-secondary">
				<Container size="xl">
					<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
						<TitleCombo
							titleChildren={'Sứ mệnh của chúng tôi'}
							description={
								<Text ta={'justify'}>
									Sứ mệnh của chúng tôi là góp phần thúc đẩy công cuộc chuyển
									đổi số, ứng dụng AI trong các khu công nghiệp, nhà máy, văn
									phòng và chính phủ thông qua các hoạt động: phát triển sản
									phẩm, nghiên cứu và đào tạo. Con đường chúng tôi chọn dù còn
									nhiều thử thách, nhưng đó chính là cơ hội vàng để đội ngũ Viện
									trí tuệ nhân tạo Việt Nam tỏa sáng.
								</Text>
							}
						/>
					</Box>
				</Container>
			</section>
			<section>
				<Container size="xl">
					<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
						<TitleCombo needWrapper={false} titleChildren={'Giá trị cốt lõi'} />
						<ScrollMotion>
							<Text>
								Kỷ luật và đồng tâm được xem là một phần không thể thiếu kiến
								tạo nên bộ GEN của Viện trí tuệ nhân tạo Việt Nam. Đó là Tinh
								thần của chúng tôi, là sức mạnh thúc đẩy lãnh đạo, CBNV của Viện
								không ngừng nỗ lực, sáng tạo vì lợi ích chung của cộng đồng, của
								khách hàng và các bên liên quan khác.
							</Text>
						</ScrollMotion>
						<Stack gap={16} mt={'lg'}>
							{dataCores.map((item, index) => (
								<Flex
									key={index}
									gap={16}
									direction={{ base: 'column', md: 'row' }}
								>
									<ScrollMotion isX>
										<Flex
											gap={8}
											align={'center'}
											wrap={'nowrap'}
											style={{ whiteSpace: 'nowrap' }}
											miw={170}
										>
											{item.icon}
											<TitleRender order={3} fz={{ base: 'h4', lg: 'h3' }}>
												{item.title}
											</TitleRender>
										</Flex>
									</ScrollMotion>
									<ScrollMotion isX={50}>{item.content}</ScrollMotion>
								</Flex>
							))}
						</Stack>
					</Box>
				</Container>
			</section>
		</>
	);
};
