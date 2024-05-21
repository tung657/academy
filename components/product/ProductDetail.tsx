'use client';

import {
	Affix,
	Anchor,
	Avatar,
	Box,
	Container,
	Divider,
	Flex,
	Group,
	Text,
	TypographyStylesProvider,
	UnstyledButton,
} from '@mantine/core';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { IProduct } from '@/types';
import { useTranslations } from 'next-intl';
import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { IconArrowRight, IconChevronLeft } from '@tabler/icons-react';
import { ShareSocial } from '../shared/ShareSocial';
import {
	formatDatePost,
	formatTimeSince,
	getReadingTime,
} from '@/utils/format-string';
import { Link, useRouter } from '@/libs/i18n-navigation';
import classes from './scss/product-detail.module.scss';
import dayjs from 'dayjs';
import { ORIGIN_URL } from '@/utils/config';

interface Props {
	dataDetail?: IProduct;
	locale: string;
}

export const ProductDetail = ({ dataDetail, locale }: Props): JSX.Element => {
	const t = useTranslations();
	const router = useRouter();

	return (
		<section>
			<Container size="xl">
				<Box pt={{ base: 24, lg: 24 }} pb={{ base: 50, lg: 60 }}>
					<Flex gap={64} justify={'space-between'}>
						<Box>
							<TitleRender order={2}>
								{locale === 'vi'
									? dataDetail?.product_name
									: dataDetail?.en_product_name}
							</TitleRender>
							<Flex justify={'space-between'} align={'center'} py={24}>
								<Group gap={8}>
									<Avatar
										size={'lg'}
										src={dataDetail?.avatar}
										alt={dataDetail?.created_user}
									/>
									<div>
										<Text fz={'md'} fw={700}>
											{dataDetail?.created_user}
										</Text>
										<Group gap={6}>
											<Text fz={'sm'}>
												{formatTimeSince(
													dataDetail?.created_date_time ||
														dayjs().format(formatDatePost),
													locale,
												)}
											</Text>
											<Text mb={8}>.</Text>
											<Text fz="sm">
												{getReadingTime(
													(locale === 'vi'
														? dataDetail?.content
														: dataDetail?.en_content) || '',
												)}{' '}
												{t('global.minutes')}
											</Text>
										</Group>
									</div>
								</Group>
								<ShareSocial />
							</Flex>
							<Group align="center">
								<Text c={'gray.8'}>
									{locale === 'vi' ? dataDetail?.slogan : dataDetail?.en_slogan}
								</Text>
								<ButtonBubble
									variant="filled"
									size="xs"
									component="a"
									target="_blank"
									rel="noopener"
									href={dataDetail?.link}
									leftSection={<IconArrowRight />}
								>
									{t('global.go_to')}
								</ButtonBubble>
							</Group>

							<TypographyStylesProvider mt={16}>
								<div
									dangerouslySetInnerHTML={{
										__html:
											(locale === 'vi'
												? dataDetail?.content
												: dataDetail?.en_content) || '',
									}}
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
						<Affix
							withinPortal={false}
							style={{ position: 'sticky' }}
							position={{
								top: 95,
								left: 0,
							}}
							h={200}
						>
							<Box w={300}>
								<Anchor
									component={Link}
									className={classes.btnBack}
									href={ORIGIN_URL}
									onClick={(event) => {
										event.preventDefault();
										router.back();
									}}
								>
									<Group align="center" gap={4}>
										<IconChevronLeft stroke={1.8} size={18} />
										<UnstyledButton fw={500}>
											{t('global.btn_cancel')}
										</UnstyledButton>
									</Group>
								</Anchor>
								<Divider my={16} />
								<Text fz={'md'} fw={700}>
									{dataDetail?.created_user}
								</Text>
								<Text fz={'sm'} c={'dimmed'} mt={6}>
									Stop thinking, start doing!
								</Text>
							</Box>
						</Affix>
					</Flex>
				</Box>
			</Container>
		</section>
	);
};
