'use client';

import { Box, Container, List, Tabs } from '@mantine/core';
import { dataResearches, researchTypeOptions } from './data-fake';
import React from 'react';
import classes from './scss/research.module.scss';
import { IconComet } from '@tabler/icons-react';

export const Research = (): JSX.Element => {
	return (
		<section className={classes.section}>
			<Container size="xl">
				<Box
					pt={{ base: 60, md: 80, lg: 100 }}
					pb={{ base: 30, md: 40, lg: 60 }}
				>
					<Tabs
						classNames={classes}
						defaultValue={researchTypeOptions[0].value + ''}
						radius={'md'}
					>
						<Tabs.List grow mb={16}>
							{researchTypeOptions.map((item) => (
								<Tabs.Tab key={item.value} value={item.value + ''}>
									{item.label}
								</Tabs.Tab>
							))}
						</Tabs.List>

						{researchTypeOptions.map((item) => (
							<Tabs.Panel value={item.value + ''} key={item.value}>
								<Tabs defaultValue={'1'} orientation="vertical">
									<Tabs.List>
										{dataResearches
											.filter((i) => i.type === item.value)
											.map((research) => (
												<Tabs.Tab
													py={16}
													key={research.value}
													value={research.value + ''}
												>
													{research.label}
												</Tabs.Tab>
											))}
									</Tabs.List>

									{dataResearches
										.filter((i) => i.type === item.value)
										.map((research) => (
											<Tabs.Panel
												value={research.value + ''}
												key={research.value}
											>
												<List
													withPadding
													spacing={12}
													icon={
														<IconComet
															stroke={1.2}
															color="var(--mantine-color-primary-filled)"
														/>
													}
												>
													{research.contents.map((content, index) => (
														<List.Item key={index} ta={'justify'}>
															{content}
														</List.Item>
													))}
												</List>
											</Tabs.Panel>
										))}
								</Tabs>
							</Tabs.Panel>
						))}
					</Tabs>
				</Box>
			</Container>
		</section>
	);
};
