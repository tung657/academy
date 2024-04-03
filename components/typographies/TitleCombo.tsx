import { Box, Text, TitleProps } from '@mantine/core';
import { TitleSub } from './TitleSub';
import React from 'react';
import { TitleRender } from './TitleRender';
import classes from './scss/title.module.scss';

interface Props extends TitleProps {
	needWrapper?: boolean;
	titleSub: string;
	titleChildren: React.ReactNode;
	description?: string;
}

export const TitleCombo = ({
	needWrapper = true,
	titleChildren,
	titleSub,
	description,
	...props
}: Props): JSX.Element => {
	return needWrapper ? (
		<Box className={classes.sectionTitle}>
			<TitleSub label={titleSub} />
			<TitleRender order={2} {...props}>
				{titleChildren}
			</TitleRender>
			<Text fw={500} c="dimmed" mt={16}>
				{description}
			</Text>
		</Box>
	) : (
		<>
			<TitleSub label={titleSub} />
			<TitleRender order={2} {...props}>
				{titleChildren}
			</TitleRender>
			<Text fw={500} c="dimmed" mt={16}>
				{description}
			</Text>
		</>
	);
};
