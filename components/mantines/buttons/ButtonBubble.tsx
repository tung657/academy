import { Button, ButtonProps } from '@mantine/core';
import classes from './scss/button-bubble.module.scss';
import React from 'react';

interface Props extends ButtonProps {
	colorHover?: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
}

export const ButtonBubble = ({
	colorHover = '#221638',
	size = 'md',
	type,
	...props
}: Props): JSX.Element => {
	return (
		<Button size={size} className={classes.button} {...props} type={type}>
			{props.children}
			<div style={{ background: colorHover }} />
		</Button>
	);
};
