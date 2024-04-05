import { Box, Card, Grid, Text } from '@mantine/core';
import { TitleCombo } from '../typographies/TitleCombo';
import classes from './scss/solution.module.scss';
import { IconRocket } from '@tabler/icons-react';
import { TitleRender } from '../typographies/TitleRender';
import Link from 'next/link';

export const OurSolution = (): JSX.Element => {
	return (
		<section className={classes.section}>
			<Box pt={{ base: 60, md: 80, lg: 100 }} pb={{ base: 30, md: 40, lg: 60 }}>
				<TitleCombo
					titleSub="Our Solution"
					titleChildren={'We Different From Others Should Choose Us'}
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
				/>

				<Grid mt={24} gutter={24}>
					{[...Array(3)].map((_, index) => (
						<Grid.Col key={index} span={{ base: 12, sm: 4 }}>
							<Card
								shadow="xs"
								py={24}
								px={32}
								withBorder
								className={classes.card}
							>
								<Card.Section py={16}>
									<IconRocket size={80} stroke={0.7} />
								</Card.Section>

								<Link href={'/'}>
									<TitleRender order={4}>Startup Applications</TitleRender>
								</Link>

								<Text c="dimmed" fw={400} my={16}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna
									adipiscing aliqua.
								</Text>

								<Link href={'/'}>
									<Text c="primary" fw={600} className={classes.btnDetail}>
										View Details
									</Text>
								</Link>
							</Card>
						</Grid.Col>
					))}
				</Grid>
			</Box>
		</section>
	);
};
