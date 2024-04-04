import { Button, ButtonProps } from '@mantine/core';
import classes from './scss/button-bubble.module.scss';
import React from 'react';

interface Props extends ButtonProps {
	colorHover?: string;
}

export const ButtonBubble = ({
	colorHover = '#221638',
	size = 'md',
	...props
}: Props): JSX.Element => {
	return (
		<Button size={size} className={classes.button} {...props}>
			{props.children}
			<div style={{ background: colorHover }} />
		</Button>
	);
};
