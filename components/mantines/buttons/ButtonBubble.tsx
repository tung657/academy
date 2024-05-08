import { Button } from '@mantine/core';
import classes from './scss/button-bubble.module.scss';
import React from 'react';
import { ButtonCustomProps } from '@/types';

interface Props extends ButtonCustomProps {
	colorHover?: string;
	component?: any;
}

export const ButtonBubble = ({
	colorHover = '#221638',
	size = 'md',
	component,
	...props
}: Props): JSX.Element => {
	return (
		<Button
			component={component}
			size={size}
			radius={'xl'}
			className={classes.button}
			{...props}
		>
			{props.children}
			<div style={{ background: colorHover }} />
		</Button>
	);
};
