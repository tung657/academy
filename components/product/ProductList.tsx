'use client';

import { Anchor, Box, Container, Grid, Image, Text } from '@mantine/core';

import { PRODUCT_DETAIL_URL } from '@/libs/urls';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { IconArrowRight } from '@tabler/icons-react';

import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { getUrlDetail } from '@/utils/format-string';
import { useTranslations } from 'next-intl';
import { IProduct } from '@/types';
import { Link } from '@/libs/i18n-navigation';
import { ScrollMotion } from '../shared/motion/ScrollMotion';

interface Props {
	data: IProduct[];
}

export const ProductList = ({ data }: Props): JSX.Element => {
	const t = useTranslations();

	return (
		<>
			{data?.map((item, index) => (
				<section
					key={item.product_id}
					className={index % 2 ? '' : 'background-secondary'}
				>
					<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
						<Container size="xl">
							<Grid mt={24} gutter={{ base: 24, md: 64 }} align="center">
								<Grid.Col span={{ base: 12, md: 6 }} order={index % 2}>
									{item?.slogan && (
										<ScrollMotion isY once>
											<Text fz={'h3'} fw={700} c={'primary'} pb={16} pl={16}>
												{item.slogan}
											</Text>
										</ScrollMotion>
									)}
									<ScrollMotion isY once delay={0.2}>
										<TitleRender order={2} pb={16} pl={16}>
											{item.product_name}
										</TitleRender>
									</ScrollMotion>
									<ScrollMotion isY once delay={0.4}>
										<Text pb={16} pl={16}>
											{item.description}
										</Text>
									</ScrollMotion>
									<ScrollMotion isX once delay={0.6}>
										<Anchor
											component={Link}
											href={getUrlDetail(PRODUCT_DETAIL_URL, item.product_id)}
										>
											<ButtonBubble
												ml={16}
												variant="filled"
												size="md"
												leftSection={<IconArrowRight />}
											>
												{t('global.see_details')}
											</ButtonBubble>
										</Anchor>
									</ScrollMotion>
								</Grid.Col>
								<Grid.Col span={{ base: 12, md: 6 }} order={(index + 1) % 2}>
									<ScrollMotion isX={index % 2 ? -100 : 100} once>
										<Image
											src={item.thumbnail}
											width={617}
											height={389}
											w={'100%'}
											h={'auto'}
											loading="lazy"
											alt={item.product_name}
										/>
									</ScrollMotion>
								</Grid.Col>
							</Grid>
						</Container>
					</Box>
				</section>
			))}
		</>
	);
};
