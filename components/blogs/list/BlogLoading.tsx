import { ScrollMotion } from '@/components/shared/motion/ScrollMotion';
import { Box, Card, Flex, Group, Skeleton, Stack } from '@mantine/core';

export const BlogLoading = (): JSX.Element => {
	return (
		<>
			{[...Array(6)].map((_, index) => (
				<Box key={index}>
					<ScrollMotion isY delay={0.2 * index}>
						<Card withBorder>
							<Flex justify={'space-between'} align={'center'} mb={16}>
								<Group gap={8}>
									<Skeleton h={45} w={45} radius={'50%'} />
									<Skeleton h={25} w={100} />
								</Group>
							</Flex>
							<Flex align={'center'} justify={'space-between'} gap={16}>
								<Stack gap={8} w={'100%'}>
									<Skeleton h={30} w={300} />
									<Skeleton h={25} />
									<Skeleton h={25} w={'80%'} />
									<Skeleton h={25} w={'60%'} />
								</Stack>
								<Skeleton maw={200} w={'100%'} h={120} />
							</Flex>
						</Card>
					</ScrollMotion>
				</Box>
			))}
		</>
	);
};
