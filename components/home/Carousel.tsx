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
	TypographyStylesProvider,
} from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import classes from './scss/carousel.module.scss';
import { Carousel } from '@mantine/carousel';
import { IconArrowRight } from '@tabler/icons-react';
import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { useRef } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Link } from '@/libs/i18n-navigation';
import { ScrollMotion } from '../shared/motion/ScrollMotion';
import { IBaseResponse, ISlide } from '@/types';
import { handleGetKeyYB } from '@/utils/format-string';
import { VALUE_MOBILE } from '@/utils/config';

interface Props {
	data: IBaseResponse<ISlide[]>;
}

interface PropsCard extends ISlide {
	mobile?: boolean;
}

export const CarouselHome = ({ data }: Props): JSX.Element => {
	console.log(data);
	const mobile = useMediaQuery(VALUE_MOBILE);
	const autoplay = useRef(Autoplay({ delay: 5000 }));
	const slides = data?.data?.map((item, index) => (
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

function Card({ mobile, ...props }: PropsCard) {
	const [opened, { open, close }] = useDisclosure();

	return (
		<Paper
			shadow="md"
			// p="md"
			radius={'none'}
			style={{
				backgroundImage: `url(${mobile ? props.small_image : props.big_image})`,
			}}
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
						<Grid.Col span={{ base: 12, md: 5 }}>
							<ScrollMotion isX>
								<TypographyStylesProvider
									dangerouslySetInnerHTML={{ __html: props.caption }}
									c="white"
								></TypographyStylesProvider>
							</ScrollMotion>
							{props.btn_label && (
								<ScrollMotion isX delay={0.2}>
									<Group mt="sm" gap={16}>
										<Anchor component={Link} href={props.btn_to || ''}>
											<ButtonBubble
												variant="filled"
												size="md"
												leftSection={<IconArrowRight />}
											>
												{props.btn_label}
											</ButtonBubble>
										</Anchor>
									</Group>
								</ScrollMotion>
							)}
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 3 }}></Grid.Col>
						{props.preview_link && (
							<Grid.Col span={{ base: 12, md: 4 }}>
								<ScrollMotion isX={16}>
									<div className={classes.video} onClick={open}>
										<AspectRatio ratio={16 / 9} mx="auto">
											<Image
												width={319}
												height={184}
												radius={'md'}
												loading="lazy"
												w={'100%'}
												h={'100%'}
												src={props.preview_thumbnail}
												alt="about"
											/>
											<Overlay radius={'md'} opacity={0.35} />
										</AspectRatio>
									</div>
								</ScrollMotion>
							</Grid.Col>
						)}
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
							src={`https://www.youtube.com/embed/${handleGetKeyYB(
								props?.preview_link,
							)}?&amp;autoplay=1&amp;loop=0&amp;mute=0&amp;controls=1&amp;enablejsapi=1`}
						></iframe>
					</AspectRatio>
				</div>
			</Modal>
		</Paper>
	);
}
