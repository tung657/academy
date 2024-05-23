'use client';

import {
	Anchor,
	Box,
	Burger,
	Center,
	Collapse,
	Container,
	Divider,
	Drawer,
	Flex,
	Group,
	Menu,
	ScrollArea,
	rem,
	useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslations } from 'use-intl';

import logo from '@/assets/images/logos/logo.png';
import { Link, usePathname } from '@/libs/i18n-navigation';
import { HOME_URL, generateTreeUrls } from '@/libs/urls';
import { NavTree } from '@/types/global';

import classes from './scss/header.module.scss';

export default function Header(): JSX.Element {
	const t = useTranslations();
	const treeUrls = generateTreeUrls(t);
	const pathname = usePathname();

	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const [openCollapse, setOpenCollapse] = useState<any>({});
	const theme = useMantineTheme();

	const handleActiveClass = (path: string) => {
		if (path === HOME_URL && pathname === path) {
			return classes.active;
		} else if (path !== HOME_URL && pathname.includes(path)) {
			return classes.active;
		}

		return '';
	};

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
						<Anchor
							component={Link}
							href={link.path}
							className={`${classes.link} ${handleActiveClass(link.path)}`}
						>
							<Center>
								<span className={classes.linkLabel}>{link.title}</span>
								<IconChevronDown size="0.9rem" stroke={1.5} />
							</Center>
						</Anchor>
					</Menu.Target>
					<Menu.Dropdown>{menuItems}</Menu.Dropdown>
				</Menu>
			);
		}

		return (
			<Anchor
				component={Link}
				key={link.path}
				href={link.path}
				className={`${classes.link} ${handleActiveClass(link.path)}`}
			>
				{link.title}
			</Anchor>
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
							<Anchor
								component={Link}
								href={item.path}
								className={`${classes.link} ${handleActiveClass(item.path)}`}
								onClick={toggleDrawer}
							>
								{item.title}
							</Anchor>
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
									transform: `rotate(${
										openCollapse[item.path] ? '-180deg' : '0deg'
									})`,
									transition: '0.3s',
								}}
								color={theme.colors.primary[6]}
							/>
						</Flex>
						{item.children.map((i) => (
							<Collapse key={i.path} in={openCollapse[item.path]}>
								<Anchor
									component={Link}
									style={{ marginLeft: 10, fontWeight: 400 }}
									href={i.path}
									className={`${classes.link} ${handleActiveClass(i.path)}`}
									onClick={toggleDrawer}
								>
									{i.title}
								</Anchor>
							</Collapse>
						))}
					</React.Fragment>
				);
			}
			return (
				<Anchor
					component={Link}
					key={item.path}
					href={item.path}
					className={`${classes.link} ${handleActiveClass(item.path)}`}
					onClick={toggleDrawer}
				>
					{item.title}
				</Anchor>
			);
		});

		return items;
	};

	return (
		<header className={classes.header}>
			<Container size="xl">
				<Box className={classes.inner} mr={-12}>
					<Anchor
						component={Link}
						href={HOME_URL}
						style={{ textDecoration: 'none' }}
					>
						<Image
							src={logo}
							width={130}
							height={54}
							priority
							alt="logo"
							placeholder="blur"
						/>
					</Anchor>
					<Group gap={5} visibleFrom="sm">
						{items}
					</Group>
					<Burger
						opened={drawerOpened}
						onClick={toggleDrawer}
						size="sm"
						hiddenFrom="sm"
					/>
				</Box>
			</Container>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				title={
					<Anchor component={Link} href={HOME_URL}>
						<Image
							src={logo}
							width={130}
							height={54}
							priority
							alt="logo"
							placeholder="blur"
						/>
					</Anchor>
				}
				hiddenFrom="sm"
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(150)})`} mx="-md">
					<Divider my="sm" />

					{/* <Anchor href={HOME_URL} className={classes.link}>
						{t('nav.home')}
					</Anchor> */}
					{/* {treeUrls?.map((link) =>
						link.children ? (
							<></>
						) : (
							<Anchor key={link.path} href={link.path} className={classes.link}>
								{link.title}
							</Anchor>
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
				</ScrollArea>
			</Drawer>
		</header>
	);
}
