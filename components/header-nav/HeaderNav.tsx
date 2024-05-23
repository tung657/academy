import {
	ActionIcon,
	Burger,
	Group,
	MantineColorScheme,
	Menu,
	Tooltip,
	useMantineColorScheme,
} from '@mantine/core';
import {
	IconCircleHalf2,
	IconLayoutSidebarLeftCollapse,
	IconLayoutSidebarLeftExpand,
	IconMoonStars,
	IconSunHigh,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { colorSchemeState } from '@/store/theme/atom';

import { AvatarDropdown } from './AvatarDropdown';

const ICON_SIZE = 20;

type HeaderNavProps = {
	mobileOpened?: boolean;
	toggleMobile?: () => void;
	desktopOpened?: boolean;
	toggleDesktop?: () => void;
	colorScheme?: MantineColorScheme;
};

const HeaderNav = ({
	desktopOpened,
	toggleDesktop,
	toggleMobile,
	mobileOpened,
}: HeaderNavProps) => {
	const { colorScheme, setColorScheme } = useMantineColorScheme();
	const setColorSchemeRecoil = useSetRecoilState(colorSchemeState);

	useEffect(() => {
		setColorSchemeRecoil(colorScheme);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Group justify="space-between">
			<Group>
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
							Chọn chủ đề
						</Menu.Label>
						<Menu.Item
							leftSection={<IconSunHigh size={16} />}
							onClick={() => {
								setColorScheme?.('light');
								setColorSchemeRecoil('light');
							}}
						>
							Sáng
						</Menu.Item>
						<Menu.Item
							leftSection={<IconMoonStars size={16} />}
							onClick={() => {
								setColorScheme?.('dark');
								setColorSchemeRecoil('dark');
							}}
						>
							Tối
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Group>
			<Group>
				<AvatarDropdown />
			</Group>
		</Group>
	);
};

export default HeaderNav;
