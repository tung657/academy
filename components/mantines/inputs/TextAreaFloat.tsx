import { Textarea, TextareaProps } from '@mantine/core';
import React, { useRef, useState } from 'react';

import classes from './scss/input-float.module.scss';

export const TextAreaFloat = (props: TextareaProps): JSX.Element => {
	const [focused, setFocused] = useState(false);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const floating = inputRef?.current?.value || focused || undefined;

	return (
		<Textarea
			{...props}
			ref={inputRef}
			classNames={classes}
			data-floating={floating}
			spellCheck={false}
			size="md"
			withAsterisk
			autoComplete="on"
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			labelProps={{ 'data-floating': floating }}
			rows={4}
		/>
	);
};
