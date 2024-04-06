import { Card, Flex, Grid, Image, Text } from '@mantine/core';
import classes from './scss/about.module.scss';
import { imgHome } from '@/assets/images/home';
import { TitleCombo } from '../typographies/TitleCombo';
import { IconArrowRight, IconDatabase } from '@tabler/icons-react';
import { TitleRender } from '../typographies/TitleRender';
import { ButtonBubble } from '../buttons/ButtonBubble';
import { imgOthers } from '@/assets/images/others';

export const AboutHome = (): JSX.Element => {
	return (
		<section
			className={classes.section}
			style={{ backgroundImage: `url(${imgOthers.circleShapeIcon})` }}
		>
			<Grid pb={{ base: 30, md: 40, lg: 60 }} gutter={'xl'}>
				<Grid.Col span={{ base: 12, md: 6 }}>
					<div className={classes.imgBox}>
						<Image
							fit="cover"
							loading="lazy"
							p={0}
							src={imgHome.about}
							alt="about us"
							w={'100%'}
							h={'auto'}
							width={650}
							height={750}
						/>
					</div>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 6 }}>
					<TitleCombo
						needWrapper={false}
						titleSub="ABOUT US"
						titleChildren={'We Different From Others Should Choose Us'}
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
					/>

					<Grid my={32}>
						<Grid.Col span={{ base: 12, sm: 6 }}>
							<Card shadow="md" withBorder h={'100%'}>
								<Flex align={'center'} gap={16}>
									<IconDatabase size={64} stroke={0.7} />
									<div>
										<TitleRender order={4} size={24}>
											10 Years
										</TitleRender>
										<Text c="dimmed">On the market</Text>
									</div>
								</Flex>
							</Card>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6 }}>
							<Card shadow="md" withBorder h={'100%'}>
								<Flex align={'center'} gap={16}>
									<IconDatabase size={64} stroke={0.7} />
									<div>
										<TitleRender order={4} size={24}>
											10 Years
										</TitleRender>
										<Text c="dimmed">On the market</Text>
									</div>
								</Flex>
							</Card>
						</Grid.Col>
					</Grid>

					<Text c="dimmed" fw={500}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
						consectetur maxime aliquid minima maiores assumenda dolorum nostrum
						ad a omnis, rem sequi tempora at quidem dolore voluptate, nemo
						optio? Accusantium.
					</Text>

					<ButtonBubble mt={24} leftSection={<IconArrowRight />}>
						More About Us
					</ButtonBubble>
				</Grid.Col>
			</Grid>
		</section>
	);
};
