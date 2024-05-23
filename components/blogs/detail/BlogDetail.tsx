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
	Pill,
	Text,
	TypographyStylesProvider,
	UnstyledButton,
} from '@mantine/core';
import { TitleRender } from '@/components/mantines/typographies/TitleRender';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/libs/i18n-navigation';
import { IBlog } from '@/types/blog';
import { formatDatePost, formatTimeSince } from '@/utils/format-string';
import dayjs from 'dayjs';
import { ShareSocial } from '@/components/shared/ShareSocial';
import { ORIGIN_URL, SEARCH_DEPARTMENT } from '@/utils/config';
import { IconChevronLeft } from '@tabler/icons-react';
import { BLOG_URL } from '@/libs/urls';
import classes from './scss/blog-detail.module.scss';

interface Props {
	data?: IBlog;
	locale: string;
}

export const BlogDetail = ({ data, locale }: Props): JSX.Element => {
	const t = useTranslations();
	const router = useRouter();

	return (
		<section>
			<Container size="xl">
				<Box pt={{ base: 24, lg: 24 }} pb={{ base: 50, lg: 60 }}>
					<Flex gap={64} justify={'space-between'}>
						<Box>
							<TitleRender order={2}>{data?.title}</TitleRender>
							<Flex justify={'space-between'} align={'center'} py={24}>
								<Group gap={8}>
									<Avatar
										size={'lg'}
										src={data?.avatar}
										alt={data?.created_user}
									/>
									<div>
										<Text fz={'md'} fw={700}>
											{data?.created_user}
										</Text>
										<Group gap={6}>
											<Text fz={'sm'}>
												{formatTimeSince(
													data?.created_date_time ||
														dayjs().format(formatDatePost),
													locale,
												)}
											</Text>
											<Text mb={8}>.</Text>
											<Text fz="sm">
												{data?.read_time} {t('global.minutes')}
											</Text>
										</Group>
									</div>
								</Group>
								<ShareSocial />
							</Flex>

							<TypographyStylesProvider my={16}>
								<div
									dangerouslySetInnerHTML={{
										__html: data?.content || '',
									}}
								/>
							</TypographyStylesProvider>

							<Anchor
								component={Link}
								href={`${BLOG_URL}?${SEARCH_DEPARTMENT}=${data?.topic_id}`}
							>
								<Pill
									className={classes.pill}
									c={'gray.7'}
									fw={500}
									size="lg"
									radius={'sm'}
								>
									{data?.research_type_name}
								</Pill>
							</Anchor>
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
									className={'btn-back'}
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
									{data?.created_user}
								</Text>
							</Box>
						</Affix>
					</Flex>
				</Box>
			</Container>
		</section>
	);
};
