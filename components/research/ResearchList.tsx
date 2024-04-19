'use client';

import { Box, Container } from '@mantine/core';
import { dataResearches, researchTypeOptions } from './data/data-fake';
import React from 'react';
import classes from './scss/research.module.scss';

export const ResearchList = (): JSX.Element => {
	return (
		<section className={classes.section}>
			<Container size="xl">
				<Box
					pt={{ base: 60, md: 80, lg: 100 }}
					pb={{ base: 30, md: 40, lg: 60 }}
				></Box>
			</Container>
		</section>
	);
};
