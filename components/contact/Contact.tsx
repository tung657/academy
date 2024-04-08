'use client';

import {
	Anchor,
	Box,
	Container,
	Flex,
	Grid,
	Group,
	Text,
	ThemeIcon,
} from '@mantine/core';
import { IconClock, IconMapPin, IconPhoneCall } from '@tabler/icons-react';
import classes from './scss/contact.module.scss';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { useTranslations } from 'next-intl';

export const Contact = (): JSX.Element => {
	const t = useTranslations();

	return (
		<section className={classes.section}>
			<Container size="xl">
				<Box
					pt={{ base: 60, md: 80, lg: 100 }}
					pb={{ base: 30, md: 40, lg: 60 }}
				>
					<Grid gutter={24}>
						<Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
							<Flex className={classes.iconWrap} align={'flex-start'} gap={16}>
								<ThemeIcon className={classes.icon} size="75" color="gray.1">
									<IconMapPin size={35} />
								</ThemeIcon>
								<Box>
									<TitleRender order={3} mb={8}>
										{t('global.address.title')}
									</TitleRender>
									<Text c={'dimmed'} ta={'justify'}>
										{t('global.address.content')}
									</Text>
								</Box>
							</Flex>
						</Grid.Col>
						<Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
							<Flex className={classes.iconWrap} align={'flex-start'} gap={16}>
								<ThemeIcon className={classes.icon} size="75" color="gray.1">
									<IconPhoneCall size={35} />
								</ThemeIcon>
								<Box>
									<TitleRender order={3} mb={8}>
										{t('global.contact.title')}
									</TitleRender>
									<Group gap={8}>
										<Text c={'dimmed'}>{t('global.contact.phone.title')}:</Text>
										<Anchor href={'tel:' + t('global.contact.phone.value')}>
											{t('global.contact.phone.label')}
										</Anchor>
									</Group>
									<Group gap={8}>
										<Text c={'dimmed'}>{t('global.contact.email.title')}:</Text>
										<Anchor href={'mailto:' + t('global.contact.email.value')}>
											{t('global.contact.email.value')}
										</Anchor>
									</Group>
								</Box>
							</Flex>
						</Grid.Col>
						<Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
							<Flex className={classes.iconWrap} align={'flex-start'} gap={16}>
								<ThemeIcon className={classes.icon} size="75" color="gray.1">
									<IconClock size={35} />
								</ThemeIcon>
								<Box>
									<TitleRender order={3} mb={8}>
										{t('global.open_time.title')}
									</TitleRender>
									<Text c={'dimmed'} ta={'justify'}>
										{t('global.open_time.content')}
									</Text>
								</Box>
							</Flex>
						</Grid.Col>
					</Grid>
				</Box>
			</Container>
		</section>
	);
};
