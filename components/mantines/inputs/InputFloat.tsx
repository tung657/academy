import { TextInput, TextInputProps } from '@mantine/core';
import React, { useRef, useState } from 'react';
import classes from './scss/input-float.module.scss';

export const InputFloat = (props: TextInputProps): JSX.Element => {
	const [focused, setFocused] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const floating = inputRef?.current?.value || focused || undefined;

	return (
		<TextInput
			{...props}
			ref={inputRef}
			size="md"
			classNames={classes}
			data-floating={floating}
			spellCheck={false}
			autoComplete="on"
			withAsterisk
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			labelProps={{ 'data-floating': floating }}
		/>
	);
};
