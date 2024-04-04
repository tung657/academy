'use client';
import {
	Menu,
	Group,
	Center,
	Burger,
	Container,
	Drawer,
	ScrollArea,
	Divider,
	rem,
	useMantineTheme,
	Collapse,
	Flex,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './scss/header.module.scss';
import Link from 'next/link';
import { useTranslations } from 'use-intl';
import { LanguagePicker } from '../langs/LanguagePicker';
import Image from 'next/image';
import logo from '@/assets/images/logos/logo.jpg';
import { HOME_URL, generateTreeUrls } from '@/libs/urls';
import { NavTree } from '@/types/global';
import React, { useState } from 'react';
import { usePathname } from '@/libs/i18n-navigation';

export default function Header(): JSX.Element {
	const t = useTranslations();
	const treeUrls = generateTreeUrls(t);
	const pathname = usePathname();

	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const [openCollapse, setOpenCollapse] = useState<any>({});
	const theme = useMantineTheme();

	const items = treeUrls.map((link) => {
		const menuItems = link?.children?.map(
			(item: { path: string; title: string }) => (
				<Menu.Item key={item.path}>{item.title}</Menu.Item>
			),
		);
		if (menuItems) {
			return (
				<Menu
					key={link.path}
					trigger="hover"
					transitionProps={{ transition: 'pop-top-left', duration: 300 }}
					withinPortal
				>
					<Menu.Target>
						<Link
							href={link.path}
							className={`${classes.link} ${pathname.includes(link.path) ? classes.active : ''}`}
						>
							<Center>
								<span className={classes.linkLabel}>{link.title}</span>
								<IconChevronDown size="0.9rem" stroke={1.5} />
							</Center>
						</Link>
					</Menu.Target>
					<Menu.Dropdown>{menuItems}</Menu.Dropdown>
				</Menu>
			);
		}

		return (
			<Link
				key={link.path}
				href={link.path}
				className={`${classes.link} ${pathname.includes(link.path) ? classes.active : ''}`}
			>
				{link.title}
			</Link>
		);
	});

	const generateTreeMobile = (tree: NavTree[]) => {
		if (!tree || tree.length === 0) return;

		const items = tree.map((item) => {
			if (item.children) {
				return (
					<React.Fragment key={item.path}>
						<Flex align={'center'}>
							{/* <Box component="span" mr={5}>
								</Box> */}
							<Link
								href={item.path}
								className={`${classes.link} ${pathname.includes(item.path) ? classes.active : ''}`}
							>
								{item.title}
							</Link>
							<IconChevronDown
								onClick={() =>
									setOpenCollapse((prev: any) => ({
										...prev,
										[item.path]: prev[item.path] ? false : true,
									}))
								}
								cursor={'pointer'}
								style={{
									width: rem(20),
									height: rem(20),
									transform: `rotate(${openCollapse[item.path] ? '-180deg' : '0deg'})`,
									transition: '0.3s',
								}}
								color={theme.colors.primary[6]}
							/>
						</Flex>
						{item.children.map((i) => (
							<Collapse key={i.path} in={openCollapse[item.path]}>
								<Link
									style={{ marginLeft: 10, fontWeight: 400 }}
									href={i.path}
									className={`${classes.link} ${pathname.includes(item.path) ? classes.active : ''}`}
								>
									{i.title}
								</Link>
							</Collapse>
						))}
					</React.Fragment>
				);
			}
			return (
				<Link
					key={item.path}
					href={item.path}
					className={`${classes.link} ${pathname.includes(item.path) ? classes.active : ''}`}
				>
					{item.title}
				</Link>
			);
		});

		return items;
	};

	return (
		<header className={classes.header}>
			<Container size="xl">
				<div className={classes.inner}>
					<Link href={HOME_URL} style={{ textDecoration: 'none' }}>
						<Image
							src={logo}
							width={130}
							height={54}
							priority
							alt="logo"
							placeholder="blur"
						/>
					</Link>
					<Group gap={5} visibleFrom="sm">
						{items}
						<LanguagePicker />
					</Group>
					<Burger
						opened={drawerOpened}
						onClick={toggleDrawer}
						size="sm"
						hiddenFrom="sm"
					/>
				</div>
			</Container>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="79%"
				padding="md"
				title={
					<Link href={HOME_URL}>
						<Image
							src={logo}
							width={130}
							height={54}
							priority
							alt="logo"
							placeholder="blur"
						/>
					</Link>
				}
				hiddenFrom="sm"
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
					<Divider my="sm" />

					<Link href={HOME_URL} className={classes.link}>
						{t('nav.home')}
					</Link>
					{/* {treeUrls?.map((link) =>
						link.children ? (
							<></>
						) : (
							<Link key={link.path} href={link.path} className={classes.link}>
								{link.title}
							</Link>
						),
					)} */}
					{generateTreeMobile(treeUrls)}
					{/* <UnstyledButton className={classes.link} onClick={toggle}>
						<Center inline>
							<Box component="span" mr={5}>
								Features
							</Box>
							<IconChevronDown
								style={{ width: rem(16), height: rem(16) }}
								color={theme.colors.blue[6]}
							/>
						</Center>
					</UnstyledButton>
					<Collapse in={opened}>Open 🎭</Collapse> */}

					<Divider my="sm" />

					<Group justify="center" grow pb="xl" px="md">
						<LanguagePicker />
					</Group>
				</ScrollArea>
			</Drawer>
		</header>
	);
}
