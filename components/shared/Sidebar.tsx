'use client';

import {
	ActionIcon,
	AppShell,
	Box,
	Flex,
	Group,
	NavLink,
	ScrollArea,
	Skeleton,
	Stack,
} from '@mantine/core';
import classes from './scss/sidebar.module.scss';
import {
	IconCircleKey,
	IconDashboard,
	IconNotebook,
	IconUsersGroup,
	IconX,
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { usePathname } from '@/libs/i18n-navigation';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user/atom';

export const Sidebar = ({ onClose, isLoading }: any): JSX.Element => {
	const tablet_match = useMediaQuery('(max-width: 768px)');
	const pathname = usePathname();
	const userRecoil = useRecoilValue(userState);

	const icons = [
		<IconDashboard key={'1'} stroke={1.3} />,
		<IconUsersGroup key={'2'} stroke={1.3} />,
		<IconNotebook key={'3'} stroke={1.3} />,
		<IconCircleKey key={'4'} stroke={1.3} />,
	];

	const renderNav = (children: any[]) => {
		if (!children?.length) return false;
		return children?.map((item, index) => (
			<NavLink
				component={Link}
				defaultOpened={pathname.includes(item.url)}
				className={
					pathname.includes(item.url)
						? item.children.length > 0
							? classes.activeFather
							: classes.active
						: ''
				}
				leftSection={item.level === 1 ? icons[index] : null}
				classNames={classes}
				key={item.key}
				label={item.title}
				href={item.url}
				childrenOffset={8}
				variant="filled"
				fw={700}
				px={4}
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
						<Group
							justify="space-between"
							style={{ flex: tablet_match ? 'auto' : 1 }}
						>
							{/* <Logo className={classes.logo} /> */}
							LOGO
						</Group>
						{tablet_match && (
							<ActionIcon onClick={onClose} variant="transparent">
								<IconX color="white" />
							</ActionIcon>
						)}
					</Flex>
				</div>
			</Box>
			<AppShell.Section px={'md'}>
				<ScrollArea my="md" h={'calc(100vh - 100px)'}>
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
