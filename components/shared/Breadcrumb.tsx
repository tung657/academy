'use client';

import { usePathname } from '@/libs/i18n-navigation';
import { Breadcrumbs, Container, Flex, Text, rem } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import classes from './scss/breadcrumb.module.scss';
import { TitleRender } from '../typographies/TitleRender';
import Link from 'next/link';
import { HOME_URL } from '@/libs/urls';
import { IconChevronRight, IconHome } from '@tabler/icons-react';
import backgroundImg from '@/assets/images/others/breadcrumb-bg.jpg';

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
					pt={{ base: rem(120), md: rem(130), lg: rem(170) }}
					pb={{ base: rem(60), md: rem(70), lg: rem(100) }}
				>
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
					<Breadcrumbs
						className={classes.breadcrumb}
						style={{ flexWrap: 'wrap' }}
						separatorMargin={2}
						separator={
							<IconChevronRight
								color="var(--mantine-color-primary-filled)"
								stroke={1}
							/>
						}
					>
						<Link href={HOME_URL} className={classes.link}>
							<IconHome stroke={1.6} size={24} />
						</Link>
						{breadcrumbs?.map((item, index) =>
							item.href ? (
								<Link
									className={classes.link}
									key={index}
									href={item?.href || ''}
								>
									<Text fz={rem(18)} fw={500}>
										{item.title}
									</Text>
								</Link>
							) : (
								<Text fz={rem(18)} key={index} fw={400}>
									{item.title}
								</Text>
							),
						)}
					</Breadcrumbs>
				</Flex>
			</Container>
		</section>
	);
};
