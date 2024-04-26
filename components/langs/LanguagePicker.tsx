'use client';

import { Flex, FlexProps } from '@mantine/core';
import { useTransition } from 'react';
import { useLocale } from 'use-intl';
import { usePathname, useRouter } from '@/libs/i18n-navigation';
import langs from './images';
import Image from 'next/image';

const localeOptions = [
	{
		label: 'VI',
		value: 'vi',
		image: langs.vietnam,
	},
	{
		label: 'EN',
		value: 'en',
		image: langs.english,
	},
];

export function LanguagePicker({ ...props }: FlexProps) {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();
	const [isPending, startTransition] = useTransition();

	const handleChangeLocale = (nextLocale: string | null) => {
		startTransition(() => {
			router.push(pathname, { locale: nextLocale || 'vi' });
			router.refresh();
		});
	};

	return (
		// <Select
		// 	variant="filled"
		// 	rightSection={<IconChevronDown size={15} />}
		// 	onChange={(event) => handleChangeLocale(event)}
		// 	withErrorStyles={false}
		// 	withCheckIcon={false}
		// 	comboboxProps={{
		// 		classNames: () => ({
		// 			dropdown: classes.combobox,
		// 		}),
		// 	}}
		// 	disabled={isPending}
		// 	w={70}
		// 	defaultValue={locale}
		// 	data={localeOptions}
		// />
		<Flex gap={4} {...props}>
			{localeOptions.map((opt) => (
				<Image
					onClick={() => !isPending && handleChangeLocale(opt.value)}
					placeholder="empty"
					style={{
						cursor: 'pointer',
						opacity: opt.value === locale ? 1 : 0.25,
					}}
					key={opt.value}
					src={opt.image}
					width={30}
					height={20}
					loading="lazy"
					alt={opt.label}
				/>
			))}
		</Flex>
	);
}
