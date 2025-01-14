'use client';

import {
	ActionIcon,
	Anchor,
	AppShell,
	Box,
	Flex,
	Group,
	Image,
	NavLink,
	ScrollArea,
	Skeleton,
	Stack,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
	IconBuildingFactory2,
	IconCircleKey,
	IconDashboard,
	IconNews,
	IconNotebook,
	IconUsersGroup,
	IconWallpaper,
	IconX,
} from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';

import logo from '@/assets/images/logos/logo.png';
import { Link, usePathname } from '@/libs/i18n-navigation';
import { DASHBOARD_URL } from '@/libs/urls';
import { userState } from '@/store/user/atom';
import { VALUE_MOBILE } from '@/utils/config';

import classes from './scss/sidebar.module.scss';

export const Sidebar = ({ onClose, isLoading }: any): JSX.Element => {
	const tablet_match = useMediaQuery(VALUE_MOBILE);
	const pathname = usePathname();
	const userRecoil = useRecoilValue(userState);

	const icons = [
		<IconDashboard key={'1'} stroke={1.3} />,
		<IconUsersGroup key={'2'} stroke={1.3} />,
		<IconNotebook key={'3'} stroke={1.3} />,
		<IconBuildingFactory2 key={'4'} stroke={1.3} />,
		<IconNews key={'5'} stroke={1.3} />,
		<IconWallpaper key={'6'} stroke={1.3} />,
		<IconCircleKey key={'7'} stroke={1.3} />,
	];

	const renderClassActive = (item: any) => {
		if (pathname.includes(item.url) && item.level === 1) {
			return classes.activeFather;
		} else if (pathname.includes(item.url) && item.level > 1)
			return classes.active;
		else if (item.level === 1) return '';
		else return classes.navLink;
	};

	const renderNav = (children: any[]) => {
		if (!children?.length) return false;
		return children?.map((item, index) => (
			<NavLink
				component={Link}
				defaultOpened={pathname.includes(item.url)}
				className={renderClassActive(item)}
				leftSection={item.level === 1 ? icons[index] : null}
				classNames={classes}
				key={item.key}
				label={item.title}
				href={item.url}
				childrenOffset={18}
				variant="filled"
				fw={700}
				px={8}
			>
				{renderNav(item.children)}
			</NavLink>
		));
	};

	return (
		<>
			<Box component="nav" p={'md'} pb={0} className={classes.navbar}>
				<div className={classes.header}>
					<Flex justify="space-between" align="center" gap="sm">
						<Group justify="center" style={{ flex: tablet_match ? 'auto' : 1 }}>
							<Anchor component={Link} href={DASHBOARD_URL}>
								<Image src={logo.src} mah={50} alt="Logo" loading="lazy" />
							</Anchor>
						</Group>
						{tablet_match && (
							<ActionIcon onClick={onClose} variant="transparent">
								<IconX color="white" />
							</ActionIcon>
						)}
					</Flex>
				</div>
			</Box>
			<AppShell.Section pl={'md'}>
				<ScrollArea my="md" h={'calc(100vh - 130px)'}>
					{isLoading ? (
						<Stack gap={4}>
							<Skeleton height={32} mt={6} radius="sm" />
							<Skeleton height={32} mt={6} radius="sm" />
							<Skeleton height={32} mt={6} radius="sm" />
							<Skeleton height={32} mt={6} radius="sm" />
							<Skeleton height={32} mt={6} radius="sm" />
							<Skeleton height={32} mt={6} radius="sm" />
						</Stack>
					) : (
						renderNav(userRecoil?.features || [])
					)}
				</ScrollArea>
			</AppShell.Section>
		</>
	);
};
