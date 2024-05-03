'use client';

import {
	ActionIcon,
	AppShell,
	Box,
	Container,
	Flex,
	MantineProvider,
	colorsTuple,
	rem,
	useMantineTheme,
} from '@mantine/core';
import { getCookie } from 'cookies-next';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { Sidebar } from '../shared/Sidebar';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/libs/i18n-navigation';
import { LOCAL_USER } from '@/utils/config';
import { useEffect, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '@/store/user/atom';
import HeaderNav from '../header-nav/HeaderNav';
import { useSearchFeatures } from '@/utils/query-loader/feature.loader';
import { IconCheck } from '@tabler/icons-react';

interface Props {
	children: React.ReactNode;
}

const dataColors = ['#0CA678', '#1098AD', '#C92A2A'];

export default function AdminLayout({ children }: Props): JSX.Element {
	const t = useTranslations();
	const pathname = usePathname();
	const setUserRecoil = useSetRecoilState(userState);
	const resetUserRecoil = useResetRecoilState(userState);
	const theme = useMantineTheme();
	const tablet_match = useMediaQuery('(max-width: 768px)');
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
	const [primaryColor, setPrimaryColor] = useState(dataColors[0]);

	const path = pathname?.split('/')?.[pathname?.split('/')?.length - 1];
	const userData = getCookie(LOCAL_USER);

	const { isLoading } = useSearchFeatures({
		params: {},
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					return;
				}

				setUserRecoil((prev) => ({ ...prev, features: data }));
			},
		},
	});

	useEffect(() => {
		if (userData) {
			setUserRecoil({ ...JSON.parse(userData) });
		}

		return () => {
			resetUserRecoil();
		};
	}, [userData, setUserRecoil, resetUserRecoil]);

	return (
		<MantineProvider
			theme={{
				colors: {
					primary: colorsTuple(primaryColor),
				},
				defaultRadius: 'md',
				components: {
					TextInput: {
						defaultProps: {
							size: 'sm',
						},
					},
					Select: {
						defaultProps: {
							size: 'sm',
						},
					},
					Button: {
						defaultProps: {
							size: 'sm',
							loaderProps: { type: 'dots' },
						},
					},
				},
			}}
		>
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
				<AppShell.Navbar bg={'primary'} c={'white'}>
					<Sidebar loading={isLoading} onClose={toggleMobile} />
					<ColorRender
						primaryColor={primaryColor}
						setPrimaryColor={setPrimaryColor}
					/>
				</AppShell.Navbar>
				<AppShell.Main>
					<TitleRender order={2} pb={16}>
						{t(`${path}.heading`)}
					</TitleRender>
					<Box>{children}</Box>
				</AppShell.Main>
			</AppShell>
		</MantineProvider>
	);
}

function ColorRender({
	primaryColor,
	setPrimaryColor,
}: {
	primaryColor: string;
	setPrimaryColor: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
	return (
		<>
			<AppShell.Section mt={-16} p={8} bg={'rgba(0, 0, 0, .2)'}>
				<Flex justify={'center'} gap={8}>
					{dataColors.map((color) => (
						<ActionIcon
							radius={'xl'}
							key={color}
							w={30}
							h={30}
							bg={color}
							style={{ border: '1px solid #fff' }}
							onClick={() => setPrimaryColor(color)}
						>
							{primaryColor === color && <IconCheck />}
						</ActionIcon>
					))}
				</Flex>
			</AppShell.Section>
		</>
	);
}
