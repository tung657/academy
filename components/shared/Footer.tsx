'use client';
import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import {
	IconBrandTwitter,
	IconBrandFacebook,
	IconBrandGoogle,
	IconBrandLinkedin,
} from '@tabler/icons-react';
import classes from '../styles/footer.module.css';
import Link from 'next/link';
import { HOME_URL } from '@/libs/urls';
import Image from 'next/image';
import logo from '@/assets/images/logos/logo.jpg';
import React from 'react';

const data = [
	{
		title: 'About',
		links: [
			{ label: 'Features', link: '#' },
			{ label: 'Pricing', link: '#' },
			{ label: 'Support', link: '#' },
			{ label: 'Forums', link: '#' },
		],
	},
	{
		title: 'Project',
		links: [
			{ label: 'Contribute', link: '#' },
			{ label: 'Media assets', link: '#' },
			{ label: 'Changelog', link: '#' },
			{ label: 'Releases', link: '#' },
		],
	},
	{
		title: 'Community',
		links: [
			{ label: 'Join Discord', link: '#' },
			{ label: 'Follow on Twitter', link: '#' },
			{ label: 'Email newsletter', link: '#' },
			{ label: 'GitHub discussions', link: '#' },
		],
	},
];

const socials = [
	{
		label: 'Facebook',
		icon: IconBrandFacebook,
		link: 'https://www.facebook.com/AIAcademyVN',
	},
	{
		label: 'Twitter',
		icon: IconBrandTwitter,
		link: 'https://www.facebook.com/AIAcademyVN',
	},
	{
		label: 'Google',
		icon: IconBrandGoogle,
		link: 'https://www.facebook.com/AIAcademyVN',
	},
	{
		label: 'Linkedin',
		icon: IconBrandLinkedin,
		link: 'https://www.facebook.com/AIAcademyVN',
	},
];

export default function FooterLinks() {
	const groups = data.map((group) => {
		const links = group.links.map((link, index) => (
			<Text<'a'>
				key={index}
				className={classes.link}
				component="a"
				href={link.link}
				onClick={(event) => event.preventDefault()}
			>
				{link.label}
			</Text>
		));

		return (
			<div className={classes.wrapper} key={group.title}>
				<Text className={classes.title}>{group.title}</Text>
				{links}
			</div>
		);
	});

	const renderIcon = (Icon: any) => {
		return <Icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />;
	};

	return (
		<footer className={classes.footer}>
			<Container size="xl" className={classes.inner}>
				<div className={classes.logo}>
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
					<Text size="sm" c="dimmed" className={classes.description}>
						Tầng 2, toà CT1 Tràng An complex, số 1 Phùng Chí Kiên, phường Nghĩa
						Đô, quận Cầu Giấy, TP Hà Nội
					</Text>

					<Group
						gap={0}
						className={classes.social}
						justify="flex-start"
						wrap="nowrap"
					>
						{socials?.map((social) => (
							<Link href={social.link} key={social.label} target="_blank">
								<ActionIcon size="lg" color="primary" variant="subtle">
									{renderIcon(social.icon)}
								</ActionIcon>
							</Link>
						))}
					</Group>
				</div>
				<div className={classes.groups}>{groups}</div>
			</Container>
			<Container size="xl" className={classes.afterFooter}>
				<Text c="dimmed" size="sm">
					© 2024 AI Academy Viet Nam.
				</Text>
			</Container>
		</footer>
	);
}
