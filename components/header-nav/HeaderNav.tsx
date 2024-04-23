'use client';

import {
	ActionIcon,
	Burger,
	Group,
	Menu,
	Tooltip,
	useMantineColorScheme,
} from '@mantine/core';
import {
	IconCircleHalf2,
	IconLayoutSidebarLeftCollapse,
	IconLayoutSidebarLeftExpand,
	IconMoonStars,
	IconPower,
	IconSunHigh,
} from '@tabler/icons-react';

const ICON_SIZE = 20;

type HeaderNavProps = {
	mobileOpened?: boolean;
	toggleMobile?: () => void;
	desktopOpened?: boolean;
	toggleDesktop?: () => void;
};

const HeaderNav = (props: HeaderNavProps) => {
	const { desktopOpened, toggleDesktop, toggleMobile, mobileOpened } = props;
	const { setColorScheme, colorScheme } = useMantineColorScheme();

	return (
		<Group justify="space-between">
			<Group gap={0}>
				<Tooltip label="Toggle side navigation">
					<ActionIcon visibleFrom="md" onClick={toggleDesktop}>
						{desktopOpened ? (
							<IconLayoutSidebarLeftCollapse />
						) : (
							<IconLayoutSidebarLeftExpand />
						)}
					</ActionIcon>
				</Tooltip>
				<Burger
					opened={mobileOpened}
					onClick={toggleMobile}
					hiddenFrom="md"
					size="sm"
				/>
				{/*<Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="md" size="sm"/>*/}
				{/* {!mobile_match && (
					<TextInput
						placeholder="search"
						rightSection={<IconSearch size={ICON_SIZE} />}
						ml="md"
						style={{ width: tablet_match ? 'auto' : rem(400) }}
					/>
				)} */}
			</Group>
			<Group>
				{/* {mobile_match && (
					<ActionIcon>
						<IconSearch size={ICON_SIZE} />
					</ActionIcon>
				)} */}
				<Tooltip label="Logout">
					<ActionIcon>
						<IconPower size={ICON_SIZE} />
					</ActionIcon>
				</Tooltip>
				<Menu shadow="lg" width={200}>
					<Menu.Target>
						<Tooltip label="Switch color modes">
							<ActionIcon variant="light">
								{colorScheme === 'auto' ? (
									<IconCircleHalf2 size={ICON_SIZE} />
								) : colorScheme === 'dark' ? (
									<IconMoonStars size={ICON_SIZE} />
								) : (
									<IconSunHigh size={ICON_SIZE} />
								)}
							</ActionIcon>
						</Tooltip>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label tt="uppercase" ta="center" fw={600}>
							Select color modes
						</Menu.Label>
						<Menu.Item
							leftSection={<IconSunHigh size={16} />}
							onClick={() => setColorScheme('light')}
						>
							Light
						</Menu.Item>
						<Menu.Item
							leftSection={<IconMoonStars size={16} />}
							onClick={() => setColorScheme('dark')}
						>
							Dark
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Group>
		</Group>
	);
};

export default HeaderNav;
