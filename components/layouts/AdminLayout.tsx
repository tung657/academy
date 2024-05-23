'use client';

import {
	ActionIcon,
	AppShell,
	Box,
	Container,
	Flex,
	MantineColorScheme,
	MantineProvider,
	colorsTuple,
	rem,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';
import { getCookie, setCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { usePathname, useRouter } from '@/libs/i18n-navigation';
import { userState } from '@/store/user/atom';
import { getFeatureTree } from '@/utils/array';
import { LOCAL_COLOR, LOCAL_USER } from '@/utils/config';
import { useGetFeaturesByUser } from '@/utils/query-loader/feature.loader';

import HeaderNav from '../header-nav/HeaderNav';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { Sidebar } from '../shared/Sidebar';

const dataColors = ['#0CA678', '#1098AD', '#C92A2A'];

interface Props {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}

export default function AdminLayout({ children, params }: Props): JSX.Element {
	const t = useTranslations();
	const pathname = usePathname();
	const router = useRouter();
	const [, setUserRecoil] = useRecoilState(userState);
	const resetUserRecoil = useResetRecoilState(userState);
	const theme = useMantineTheme();
	const tablet_match = useMediaQuery('(max-width: 768px)');
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
	const [primaryColor, setPrimaryColor] = useState(
		getCookie(LOCAL_COLOR) || dataColors[0],
	);
	const { colorScheme } = useMantineColorScheme();

	const path = pathname?.split('/')?.[pathname?.split('/')?.length - 1];

	if (params?.locale !== 'vi') {
		router.push(pathname, { locale: 'vi' });
		router.refresh();
	}

	const {
		data: dataFeatures,
		isSuccess,
		isFetching: isLoading,
	} = useGetFeaturesByUser({
		user_id: JSON.parse(getCookie(LOCAL_USER) || '{}')?.user_id,
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					return;
				}

				const features = getFeatureTree(data, 1, 0);

				const userData = getCookie(LOCAL_USER);
				userData && setUserRecoil({ ...JSON.parse(userData) });

				setUserRecoil((prev) => ({ ...prev, features }));
			},
		},
	});

	useEffect(() => {
		return () => {
			resetUserRecoil();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (
		isSuccess &&
		!dataFeatures?.find((feature: any) => feature.url === pathname)
	)
		return notFound();

	return (
		<MantineProvider
			theme={{
				colors: {
					primary: colorsTuple(primaryColor),
				},
				defaultRadius: 'md',
				components: {
					Text: {
						defaultProps: {
							size: 'sm',
						},
					},
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
				<AppShell.Navbar>
					<Sidebar isLoading={isLoading} onClose={toggleMobile} />
					<ColorRender
						primaryColor={primaryColor}
						setPrimaryColor={setPrimaryColor}
						colorScheme={colorScheme}
					/>
				</AppShell.Navbar>
				<AppShell.Main bg={colorScheme === 'light' ? 'gray.1' : 'dark'}>
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
	colorScheme,
}: {
	primaryColor: string;
	setPrimaryColor: React.Dispatch<React.SetStateAction<string>>;
	colorScheme: MantineColorScheme;
}): JSX.Element {
	return (
		<>
			<AppShell.Section
				mt={-10}
				style={{ zIndex: 1 }}
				bg={colorScheme === 'light' ? 'white' : 'dark'}
			>
				<Flex justify={'center'} p={8} gap={8} bg={'rgba(0, 0, 0, .2)'}>
					{dataColors.map((color) => (
						<ActionIcon
							radius={'xl'}
							key={color}
							w={30}
							h={30}
							bg={color}
							style={{ border: '1px solid #fff' }}
							onClick={() => {
								setPrimaryColor(color);
								setCookie(LOCAL_COLOR, color);
							}}
						>
							{primaryColor === color && <IconCheck />}
						</ActionIcon>
					))}
				</Flex>
			</AppShell.Section>
		</>
	);
}
