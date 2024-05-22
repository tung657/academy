'use client';

import { Anchor, Group, Menu, Text } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import {
	IconBrandFacebook,
	IconBrandX,
	IconDots,
	IconLink,
	IconMail,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { EmailShare, FacebookShare, TwitterShare } from 'react-share-lite';

import { usePathname } from '@/libs/i18n-navigation';
import { ORIGIN_URL } from '@/utils/config';

import { getNotifications } from '../mantines/notification/getNotifications';

export const ShareSocial = () => {
	const t = useTranslations();
	const pathname = usePathname();

	const clipboard = useClipboard({ timeout: 1000 });

	const link = ORIGIN_URL + pathname;

	useEffect(() => {
		if (clipboard.copied) {
			getNotifications('success', t, t('messages.copied'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clipboard.copied]);

	return (
		<>
			<Menu
				trigger="click"
				radius={'md'}
				position="bottom-end"
				transitionProps={{ transition: 'pop-top-left' }}
			>
				<Menu.Target>
					<Group>
						<Anchor c={'black'}>
							<IconDots size={20} stroke={1.2} />
						</Anchor>
					</Group>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item>
						<FacebookShare
							url={`${link}`}
							quote="Here"
							// @ts-ignore
							buttonTitle={
								<Group align="center" gap={8}>
									<IconBrandFacebook size={18} />
									<Text>{t('global.share_with_fb')}</Text>
								</Group>
							}
						/>
					</Menu.Item>
					<Menu.Item>
						<TwitterShare
							url={`${link}`}
							quote="Here"
							// @ts-ignore
							buttonTitle={
								<Group align="center" gap={8}>
									<IconBrandX size={18} />
									<Text>{t('global.share_with_x')}</Text>
								</Group>
							}
						/>
					</Menu.Item>
					<Menu.Item>
						<EmailShare
							url={`${link}`}
							quote="Here"
							// @ts-ignore
							buttonTitle={
								<Group align="center" gap={8}>
									<IconMail size={18} />
									<Text>{t('global.share_with_email')}</Text>
								</Group>
							}
						/>
					</Menu.Item>
					<Menu.Item>
						<Group
							align="center"
							gap={8}
							onClick={() => {
								clipboard.copy(link);
							}}
						>
							<IconLink size={18} />
							<Text>{t('global.share_with_link')}</Text>
						</Group>
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</>
	);
};
