'use client';
import { TitleCombo } from '../mantines/typographies/TitleCombo';
import classes from './scss/media.module.scss';

import { AspectRatio, Box, Container, Flex, Text } from '@mantine/core';

export const Media = (): JSX.Element => {
	return (
		<section className={classes.section}>
			<Box pt={{ base: 60, md: 80, lg: 100 }} pb={{ base: 30, md: 40, lg: 60 }}>
				<Container size="xl">
					<TitleCombo
						titleSub="MEDIA"
						titleChildren="What Our Clients are Saying?"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
					/>
					{[...Array(6)].map((_, index) => (
						<Flex
							key={index}
							className={classes.imgBox}
							align={'center'}
							justify={'center'}
							gap={'sm'}
						>
							<AspectRatio
								className={classes.media}
								ratio={16 / 9}
								style={{ width: '800px' }}
							>
								<iframe
									width="560"
									height="315"
									src="https://www.youtube.com/embed/Cxc6yDyCXaY?si=DVsHtVRFBaPl05y-"
									title="YouTube video player"
									style={{ border: 0 }}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									allowFullScreen
								></iframe>
							</AspectRatio>
							<Text
								className={classes.text}
								c="dimmed"
								fw={400}
								my={16}
								w={'400'}
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna adipiscing
								aliqua.
							</Text>
						</Flex>
					))}
				</Container>
			</Box>
		</section>
	);
};
