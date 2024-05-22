'use client';

import { ActionIcon, TextInput, TextInputProps, rem } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { TransitionStartFunction, useRef } from 'react';

import { usePathname, useRouter } from '@/libs/i18n-navigation';
import { SEARCH_CONTENT, SEARCH_PAGE } from '@/utils/config';

interface Props extends TextInputProps {
	startTransition?: TransitionStartFunction;
}

export function InputSearch(props: Props) {
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
		props.startTransition
			? props.startTransition(() => router.refresh())
			: router.refresh();
	};

	return (
		<TextInput
			ref={inputRef}
			radius="xl"
			size="sm"
			placeholder="Tìm kiếm"
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
