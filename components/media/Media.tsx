'use client';

import classes from './scss/media.module.scss';
import { useDisclosure } from '@mantine/hooks';
import {
	AspectRatio,
	Box,
	Container,
	Grid,
	Image,
	Modal,
	Overlay,
	Text,
} from '@mantine/core';

export const Media = (): JSX.Element => {
	const [opened, { open, close }] = useDisclosure();
	return (
		<section className={classes.section}>
			<Box pt={{ base: 60, md: 80, lg: 100 }} pb={{ base: 30, md: 40, lg: 60 }}>
				<Container size="xl">
					<Grid gutter={24}>
						{[...Array(6)].map((_, index) => (
							<Grid.Col key={index} span={{ base: 12, sm: 4 }}>
								<div className={classes.video} onClick={open}>
									<AspectRatio ratio={16 / 9} mx="auto">
										<Image
											width={319}
											height={184}
											radius={'md'}
											w={'100%'}
											h={'100%'}
											src={
												'https://cdn.shopify.com/s/files/1/0458/5167/2729/t/2/assets/pf-c7e24593--videothumbnail_319x.jpg?v=1629451681'
											}
											alt="about"
										/>
										<Overlay radius={'md'} opacity={0.35} />
									</AspectRatio>
								</div>

								<Text className={classes.text} c="dimmed" fw={400} my={16}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna
									adipiscing aliqua.
								</Text>
							</Grid.Col>
						))}
					</Grid>
				</Container>
			</Box>
			<Modal
				opened={opened}
				onClose={close}
				size={'xl'}
				fullScreen
				zIndex={1000}
			>
				<div>
					<AspectRatio ratio={16 / 9} mah={'calc(100vh - 100px)'}>
						<iframe
							width="100%"
							height="100%"
							data-pagefly-popup="true"
							allowFullScreen
							src="https://www.youtube.com/embed/-6PFfp_Lerw?&amp;autoplay=1&amp;loop=0&amp;mute=0&amp;controls=1&amp;enablejsapi=1"
						></iframe>
					</AspectRatio>
				</div>
			</Modal>
		</section>
	);
};
