'use client';

import { useSearchFeatures } from '@/utils';
import {
	ActionIcon,
	AppShell,
	Flex,
	Group,
	NavLink,
	ScrollArea,
} from '@mantine/core';
import classes from './scss/sidebar.module.scss';
import { IconX } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { usePathname } from '@/libs/i18n-navigation';

export const Sidebar = ({ onClose }: any): JSX.Element => {
	const tablet_match = useMediaQuery('(max-width: 768px)');
	const pathname = usePathname();
	const { data: features, isLoading } = useSearchFeatures({
		params: {},
	});

	const renderNav = (children: any[]) => {
		if (children?.length === 0) return false;
		return children?.map((item) => (
			<NavLink
				defaultOpened
				className={
					pathname.includes(item.url)
						? item.children.length > 0
							? classes.activeFather
							: classes.active
						: ''
				}
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
			<nav className={classes.navbar}>
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
			</nav>
			<AppShell.Section>
				<ScrollArea my="md" h={'calc(100vh - 100px)'}>
					{isLoading ? 'Loading...' : renderNav(features || [])}
				</ScrollArea>
			</AppShell.Section>
		</>
	);
};
