'use client';

import { Box, Container, Text, TypographyStylesProvider } from '@mantine/core';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { IProduct } from '@/types';
import { useTranslations } from 'next-intl';
import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { IconArrowRight } from '@tabler/icons-react';

interface Props {
	dataDetail?: IProduct;
}

export const ProductDetail = ({ dataDetail }: Props): JSX.Element => {
	const t = useTranslations();

	return (
		<section>
			<Container size="xl">
				<Box pt={{ base: 50, lg: 60 }} pb={{ base: 50, lg: 60 }}>
					<TitleRender order={2} mb={8}>
						{dataDetail?.product_name}
					</TitleRender>
					<Text c={'gray.7'} mb={4}>
						{dataDetail?.slogan}
					</Text>
					<ButtonBubble
						variant="filled"
						size="sm"
						component="a"
						target="_blank"
						rel="noopener"
						href={dataDetail?.link}
						leftSection={<IconArrowRight />}
					>
						{t('global.go_to')}
					</ButtonBubble>

					<TypographyStylesProvider mt={16}>
						<div
							dangerouslySetInnerHTML={{ __html: dataDetail?.content || '' }}
						/>
					</TypographyStylesProvider>

					<ButtonBubble
						variant="filled"
						size="md"
						mt={16}
						component="a"
						target="_blank"
						rel="noopener"
						href={dataDetail?.link}
						leftSection={<IconArrowRight />}
					>
						{t('global.go_to')}
					</ButtonBubble>
				</Box>
			</Container>
		</section>
	);
};
