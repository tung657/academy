'use client';

import { AppShell, Box, Burger, Group, ScrollArea } from '@mantine/core';
import { getCookie } from 'cookies-next';
import { useDisclosure } from '@mantine/hooks';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { Sidebar } from '../shared/Sidebar';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/libs/i18n-navigation';
import { LOCAL_USER } from '@/utils';
import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '@/store/user/atom';

interface Props {
	children: React.ReactNode;
}

export default function AdminLayout({ children }: Props): JSX.Element {
	const [opened, { toggle }] = useDisclosure();
	const t = useTranslations();
	const pathname = usePathname();
	const setUserProfile = useSetRecoilState(userState);
	const resetUserProfile = useResetRecoilState(userState);

	const path = pathname?.split('/')?.[pathname?.split('/')?.length - 1];
	const userData = getCookie(LOCAL_USER);

	useEffect(() => {
		if (userData) {
			setUserProfile(JSON.parse(userData));
		}

		return () => {
			resetUserProfile();
		};
	}, [userData, setUserProfile, resetUserProfile]);

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
			padding="md"
		>
			<AppShell.Header bg={'primary'} withBorder={false}>
				<Group h="100%" px="md" justify="space-between">
					<TitleRender order={3}>LOGO</TitleRender>
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md" variant="filled" bg={'primary'} c={'white'}>
				<AppShell.Section grow my="md" component={ScrollArea}>
					<Sidebar />
				</AppShell.Section>
				<AppShell.Section>
					Navbar footer – always at the bottom
				</AppShell.Section>
			</AppShell.Navbar>
			<AppShell.Main>
				<TitleRender order={2} pb={16}>
					{t(`${path}.heading`)}
				</TitleRender>
				<Box>{children}</Box>
			</AppShell.Main>
		</AppShell>
	);
}