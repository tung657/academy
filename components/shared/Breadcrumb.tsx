'use client';

import {
	Anchor,
	Breadcrumbs,
	Container,
	Flex,
	Image,
	Text,
	rem,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { imgOthers } from '@/assets/images/others';
import backgroundImg from '@/assets/images/others/breadcrumb-bg.jpg';
import { Link, usePathname } from '@/libs/i18n-navigation';
import { HOME_URL } from '@/libs/urls';

import { TitleRender } from '../mantines/typographies/TitleRender';
import { ScrollMotion } from './motion/ScrollMotion';
import classes from './scss/breadcrumb.module.scss';

interface Props {
	lastLabel?: string;
}

type breadcrumbType = { title: string; href?: string };

export const Breadcrumb = ({ lastLabel }: Props): JSX.Element => {
	const path = usePathname();
	const params = useParams();
	const t = useTranslations('nav');

	const [breadcrumbs, setBreadcrumbs] = useState<breadcrumbType[]>([]);

	useEffect(() => {
		const segments = path
			.split('/')
			.filter((i) => i !== '' && !Object.values(params).includes(i));

		const items: breadcrumbType[] = segments.map((i, index) => ({
			title: t(i),
			href: `/${segments.slice(0, index + 1).join('/')}`,
		}));

		if (lastLabel) items.push({ title: lastLabel });

		if (items.length > 0) items[items.length - 1].href = undefined;

		setBreadcrumbs(items);
	}, [path, params, t, lastLabel]);

	return (
		<section
			className={classes.section}
			style={{ backgroundImage: `url(${backgroundImg.src})` }}
		>
			<Container size="xl">
				<Flex
					direction="column"
					justify={{ base: 'center', lg: 'flex-start' }}
					align={{ base: 'center', lg: 'flex-start' }}
					pt={{ base: rem(60), md: rem(70), lg: rem(100) }}
					pb={{ base: rem(60), md: rem(70), lg: rem(100) }}
				>
					<ScrollMotion once isX>
						<TitleRender
							order={1}
							pb={16}
							fz={{
								base: '30px !important',
								md: '32px !important',
								lg: '35px !important',
								xl: '44px !important',
							}}
						>
							{breadcrumbs?.[breadcrumbs.length - 1]?.title}
						</TitleRender>
					</ScrollMotion>
					<Breadcrumbs
						className={classes.breadcrumb}
						style={{ flexWrap: 'wrap' }}
						separatorMargin={0}
						separator={
							<ScrollMotion
								once
								isX
								delay={Math.floor(breadcrumbs.length / 2) * 0.1 + 0.1}
							>
								<IconChevronRight
									color="var(--mantine-color-primary-filled)"
									stroke={1}
								/>
							</ScrollMotion>
						}
					>
						<ScrollMotion once isX>
							<Anchor
								href={HOME_URL}
								component={Link}
								className={classes.link}
								fw={500}
							>
								{t('home')}
							</Anchor>
						</ScrollMotion>
						{breadcrumbs?.map((item, index) => (
							<ScrollMotion once key={index} isX delay={0.2 * (index + 1)}>
								{item.href ? (
									<Anchor
										component={Link}
										className={classes.link}
										key={index}
										href={item?.href || ''}
										fw={500}
									>
										<Text fz={rem(16)} fw={600} p={4}>
											{item.title}
										</Text>
									</Anchor>
								) : (
									<Text fz={rem(16)} key={index} fw={400} c={'dimmed'} p={4}>
										{item.title}
									</Text>
								)}
							</ScrollMotion>
						))}
					</Breadcrumbs>
				</Flex>
			</Container>

			<div className={classes.shape1}>
				<Image
					src={imgOthers.shape1}
					alt="shape 1"
					width={22}
					height={22}
					loading="lazy"
				/>
			</div>
			<div className={classes.shape2}>
				<Image
					src={imgOthers.shape2}
					alt="shape 2"
					width={202}
					height={202}
					loading="lazy"
				/>
			</div>
		</section>
	);
};
