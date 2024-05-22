import { Card, Grid, Skeleton } from '@mantine/core';
import { ScrollMotion } from '../shared/motion/ScrollMotion';

export const CourseLoading = (): JSX.Element => {
	return (
		<Grid gutter={24}>
			{[...Array(6)].map((_, index) => (
				<Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
					<ScrollMotion isY={50} once>
						<Card shadow="sm" padding="md" radius="md">
							<Card.Section>
								<Skeleton height={250} width={'100%'} />
							</Card.Section>

							<Skeleton height={30} my={8} radius={'md'} />

							<Skeleton height={25} my={4} radius={'md'} />
							<Skeleton height={25} my={4} radius={'md'} w={'70%'} />
						</Card>
					</ScrollMotion>
				</Grid.Col>
			))}
		</Grid>
	);
};
