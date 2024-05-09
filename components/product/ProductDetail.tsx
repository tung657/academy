'use client';

import {
	Affix,
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
import { useRouter } from '@/libs/i18n-navigation';
import classes from './scss/product-detail.module.scss';
import dayjs from 'dayjs';

interface Props {
	dataDetail?: IProduct;
}

export const ProductDetail = ({ dataDetail }: Props): JSX.Element => {
	const t = useTranslations();
	const router = useRouter();

	return (
		<section>
			<Container size="xl">
				<Box pt={{ base: 24, lg: 24 }} pb={{ base: 50, lg: 60 }}>
					<Flex gap={64}>
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
								<Group gap={4} c={'gray.7'} className={classes.btnBack}>
									<IconChevronLeft stroke={1.8} size={20} />
									<UnstyledButton fw={700} onClick={() => router.back()}>
										{t('global.btn_cancel')}
									</UnstyledButton>
								</Group>
								<Divider my={16} />
								<Text fz={'md'} fw={700}>
									{dataDetail?.created_user}
								</Text>
								<Text fz={'sm'} c={'dimmed'} mt={6}>
									Stop thinking, start doing!
								</Text>
							</Box>
						</Affix>
						<Box>
							<TitleRender order={2}>{dataDetail?.product_name}</TitleRender>
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
												)}
											</Text>
											<Text mb={8}>.</Text>
											<Text fz="sm">
												{getReadingTime(dataDetail?.content + '')} phút đọc
											</Text>
										</Group>
									</div>
								</Group>
								<ShareSocial />
							</Flex>
							<Group align="center">
								<Text c={'gray.8'}>{dataDetail?.slogan}</Text>
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
										__html: dataDetail?.content || '',
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
					</Flex>
				</Box>
			</Container>
		</section>
	);
};
