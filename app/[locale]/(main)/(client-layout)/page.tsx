'use client';

import {
	Flex,
	Switch,
	Text,
	rem,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export default function Home() {
	const t = useTranslations('home');

	const { toggleColorScheme, colorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const theme = useMantineTheme();

	const sunIcon = (
		<IconSun
			style={{ width: rem(16), height: rem(16) }}
			stroke={2.5}
			color={theme.colors.yellow[4]}
		/>
	);

	const moonIcon = (
		<IconMoonStars
			style={{ width: rem(16), height: rem(16) }}
			stroke={2.5}
			color={theme.colors.blue[6]}
		/>
	);

	return (
		<Flex
			justify="center"
			direction={'column'}
			align={'center'}
			rowGap={16}
			style={{ minHeight: '50vh' }}
		>
			<Text>{t('title')}</Text>
			<Switch
				size="lg"
				checked={colorScheme === 'dark'}
				color="dark.4"
				onLabel={moonIcon}
				offLabel={sunIcon}
				onChange={toggleColorScheme}
				label={'Dark mode'}
			/>
		</Flex>
	);
}
