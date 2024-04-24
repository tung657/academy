'use client';

import { usePathname, useRouter } from '@/libs/i18n-navigation';
import { SEARCH_CONTENT, SEARCH_PAGE } from '@/utils/config';
import { TextInput, TextInputProps, ActionIcon, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export function InputSearch(props: TextInputProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const inputRef = useRef<HTMLInputElement>(null);
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const handleSearch = () => {
		const value = inputRef.current?.value || '';
		const current = new URLSearchParams(searchParams.toString());

		current.delete(SEARCH_PAGE);
		current.set(SEARCH_CONTENT, value);

		router.push(`${pathname}?${current}`);
		router.refresh();
	};

	return (
		<TextInput
			ref={inputRef}
			radius="xl"
			size="sm"
			placeholder="Search questions"
			rightSectionWidth={34}
			defaultValue={searchContent}
			spellCheck={false}
			onKeyDown={(event) => {
				if (event.key === 'Enter') handleSearch();
			}}
			leftSection={
				<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
			}
			rightSection={
				<ActionIcon
					size={32}
					radius="xl"
					variant="filled"
					onClick={() => handleSearch()}
				>
					<IconArrowRight
						style={{ width: rem(18), height: rem(18) }}
						stroke={1.5}
					/>
				</ActionIcon>
			}
			{...props}
		/>
	);
}
