import { Box, Text, TitleProps } from '@mantine/core';
import React from 'react';

import { ScrollMotion } from '@/components/shared/motion/ScrollMotion';

import { TitleRender } from './TitleRender';
import { TitleSub } from './TitleSub';
import classes from './scss/title.module.scss';

interface Props extends TitleProps {
	needWrapper?: boolean;
	titleSub?: string;
	titleChildren: React.ReactNode;
	description?: React.ReactNode;
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
			<ScrollMotion isY>
				{titleSub && <TitleSub label={titleSub} />}
			</ScrollMotion>
			<ScrollMotion isY delay={0.1}>
				<TitleRender order={2} {...props}>
					{titleChildren}
				</TitleRender>
			</ScrollMotion>
			<ScrollMotion isY delay={0.2}>
				<Text fw={500} mt={16}>
					{description}
				</Text>
			</ScrollMotion>
		</Box>
	) : (
		<>
			<ScrollMotion isY>
				{titleSub && <TitleSub label={titleSub} />}
			</ScrollMotion>
			<ScrollMotion isY delay={0.1}>
				<TitleRender order={2} {...props}>
					{titleChildren}
				</TitleRender>
			</ScrollMotion>
			<ScrollMotion isY delay={0.2}>
				<Text fw={500} mt={16}>
					{description}
				</Text>
			</ScrollMotion>
		</>
	);
};
