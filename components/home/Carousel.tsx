'use client';

import {
	Anchor,
	AspectRatio,
	Container,
	Flex,
	Grid,
	Group,
	Image,
	Modal,
	Overlay,
	Paper,
	Text,
	useMantineTheme,
} from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import classes from './scss/carousel.module.scss';
import { Carousel } from '@mantine/carousel';
import { IconArrowRight } from '@tabler/icons-react';
import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { useRef } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { TitleRender } from '../mantines/typographies/TitleRender';
import { imgHome } from '@/assets/images/home';
import { JOB_URL } from '@/libs/urls';
import { Link } from '@/libs/i18n-navigation';

const data = [
	{
		image: imgHome.banner1,
		title: 'Tạo dựng giá trị, sánh tầm quốc tế.',
		description:
			'Phấn đấu hết mình, phá vỡ giới hạn bản thân, vươn tới những ước mơ vĩ đại.',
		category: 'Chào mừng',
	},
	{
		image: imgHome.banner2,
		title: 'Tạo dựng giá trị, sánh tầm quốc tế.',
		description:
			'Phấn đấu hết mình, phá vỡ giới hạn bản thân, vươn tới những ước mơ vĩ đại.',
		category: 'Chào mừng',
	},
];

interface Props {
	image: string;
	title: string;
	category: string;
	description: string;
	mobile?: boolean;
}

export const CarouselHome = (): JSX.Element => {
	const theme = useMantineTheme();
	const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
	const autoplay = useRef(Autoplay({ delay: 5000 }));
	const slides = data.map((item, index) => (
		<Carousel.Slide key={index}>
			<Card {...item} mobile={mobile} />
		</Carousel.Slide>
	));

	return (
		<Carousel
			className={classes.carouselWrap}
			height="calc(100vh - 85px)"
			slideSize={'100%'}
			slideGap={0}
			align="start"
			slidesToScroll={1}
			plugins={[autoplay?.current]}
			onMouseEnter={autoplay?.current?.stop}
			onMouseLeave={autoplay?.current?.reset}
		>
			{slides}
		</Carousel>
	);
};

function Card({ image, title, category, description }: Props) {
	const [opened, { open, close }] = useDisclosure();

	return (
		<Paper
			shadow="md"
			// p="md"
			radius={'none'}
			style={{ backgroundImage: `url(${image})` }}
			className={classes.card}
		>
			<Overlay zIndex={1} opacity={0.35} />
			<Flex
				align={'center'}
				justify={'flex-start'}
				style={{ height: '100%', width: '100%', zIndex: 2 }}
			>
				<Container size="xl" flex={1}>
					<Grid align="center">
						<Grid.Col span={{ base: 12, md: 8 }}>
							<Text className={classes.category} size="xs">
								{category}
							</Text>
							<TitleRender my="sm" c="white" order={1}>
								{title}
							</TitleRender>
							<Text c="white">{description}</Text>

							<Group mt="sm" gap={16}>
								<Anchor component={Link} href={JOB_URL}>
									<ButtonBubble
										variant="filled"
										size="md"
										leftSection={<IconArrowRight />}
									>
										Gia nhập chúng tôi
									</ButtonBubble>
								</Anchor>
							</Group>
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 4 }}>
							<div className={classes.video} onClick={open}>
								<AspectRatio ratio={16 / 9} mx="auto">
									<Image
										width={319}
										height={184}
										radius={'md'}
										loading="lazy"
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
						</Grid.Col>
					</Grid>
				</Container>
			</Flex>
			<Modal
				opened={opened}
				onClose={close}
				size={'xl'}
				fullScreen
				zIndex={250}
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
		</Paper>
	);
}
