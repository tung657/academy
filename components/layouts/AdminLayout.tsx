'use client';

import { AppShell, Box, Container, rem, useMantineTheme } from '@mantine/core';
import { getCookie } from 'cookies-next';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { Sidebar } from '../shared/Sidebar';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/libs/i18n-navigation';
import { LOCAL_USER } from '@/utils';
import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '@/store/user/atom';
import HeaderNav from '../header-nav/HeaderNav';

interface Props {
	children: React.ReactNode;
}

export default function AdminLayout({ children }: Props): JSX.Element {
	const t = useTranslations();
	const pathname = usePathname();
	const setUserProfile = useSetRecoilState(userState);
	const resetUserProfile = useResetRecoilState(userState);
	const theme = useMantineTheme();
	const tablet_match = useMediaQuery('(max-width: 768px)');
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

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
			layout="alt"
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: 'md',
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
			}}
			padding={'md'}
		>
			<AppShell.Header
				style={{
					height: rem(60),
					border: 'none',
					boxShadow: tablet_match ? theme.shadows.md : theme.shadows.sm,
				}}
			>
				<Container fluid py="sm" px="lg">
					<HeaderNav
						desktopOpened={desktopOpened}
						mobileOpened={mobileOpened}
						toggleDesktop={toggleDesktop}
						toggleMobile={toggleMobile}
					/>
				</Container>
			</AppShell.Header>
			<AppShell.Navbar bg={'teal.7'} p={'md'} c={'white'}>
				<Sidebar onClose={toggleMobile} />
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
