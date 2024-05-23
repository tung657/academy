'use client';

import {
	ActionIcon,
	Anchor,
	Container,
	Grid,
	Group,
	Image,
	Text,
	rem,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBrandFacebook } from '@tabler/icons-react';
import React from 'react';

import logo from '@/assets/images/logos/logo.png';
import { imgOthers } from '@/assets/images/others';
import { Link } from '@/libs/i18n-navigation';
import { HOME_URL } from '@/libs/urls';
import { VALUE_MOBILE } from '@/utils/config';

import { LanguagePicker } from '../langs/LanguagePicker';
import classes from './scss/footer.module.scss';

const socials = [
	{
		label: 'Facebook',
		icon: IconBrandFacebook,
		link: 'https://www.facebook.com/AIAcademyVN',
	},
	// {
	// 	label: 'Twitter',
	// 	icon: IconBrandTwitter,
	// 	link: 'https://www.facebook.com/AIAcademyVN',
	// },
	// {
	// 	label: 'Google',
	// 	icon: IconBrandGoogle,
	// 	link: 'https://www.facebook.com/AIAcademyVN',
	// },
	// {
	// 	label: 'Linkedin',
	// 	icon: IconBrandLinkedin,
	// 	link: 'https://www.facebook.com/AIAcademyVN',
	// },
];

export default function FooterLinks() {
	const isMobile = useMediaQuery(VALUE_MOBILE);

	const renderIcon = (Icon: any) => {
		return <Icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />;
	};

	return (
		<footer
			className={classes.footer}
			style={{
				backgroundImage: isMobile
					? `linear-gradient(360deg,#f1f3f600 30.78%,#f1f3f6 54.4%),url(${imgOthers.map})`
					: `linear-gradient(270deg, #f1f3f600 0, #f1f3f6 29.69%), url(${imgOthers.map})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'contain',
				backgroundPosition: isMobile
					? 'center bottom'
					: '-20vw top, right center',
			}}
		>
			<div>
				<Container size="xl">
					<Grid>
						<Grid.Col span={{ base: 12, md: 6 }}>
							<Anchor
								component={Link}
								href={HOME_URL}
								style={{ textDecoration: 'none' }}
							>
								<Image
									src={logo.src}
									w={'auto'}
									maw={300}
									alt="logo"
									fit="cover"
									loading="lazy"
								/>
							</Anchor>
							<Text py={8} fw={600}>
								VIỆN TRÍ TUỆ NHÂN TẠO VIỆT NAM
							</Text>
							<Text size="sm" pb={8}>
								Trụ sở chính: tầng 2, CT1, Tràng An Complex, Hanoi, Vietnam
							</Text>
							<Text size="sm" pb={8}>
								SĐT:{' '}
								<Anchor size="sm" href="tel:024 6662 7166">
									024 6662 7166
								</Anchor>
							</Text>
							<Text size="sm" pb={8}>
								Mail:{' '}
								<Anchor size="sm" href="mailto:cskh@aiacademy.edu.vn">
									cskh@aiacademy.edu.vn
								</Anchor>
							</Text>
							<Text size="sm" pb={8}>
								Website:{' '}
								<Anchor size="sm" href="https://aiacademy.edu.vn/">
									https://aiacademy.edu.vn
								</Anchor>
							</Text>
							<Text size="sm">Thời gian mở cửa: 8:00 - 17:30</Text>

							<Group
								gap={0}
								className={classes.social}
								justify="flex-start"
								align="center"
								wrap="nowrap"
							>
								{socials?.map((social) => (
									<Anchor
										aria-label={social.label}
										href={social.link}
										key={social.label}
										target="_blank"
										rel="noopener"
									>
										<ActionIcon size="lg" color="primary" variant="subtle">
											{renderIcon(social.icon)}
										</ActionIcon>
									</Anchor>
								))}

								<LanguagePicker pl={6} />
							</Group>
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 6 }}>
							<Anchor
								href="https://www.google.com/maps/place/AI+Academy+Vietnam/@21.0439164,105.8005529,17z/data=!3m1!4b1!4m6!3m5!1s0x3135aba9b3f6f2ef:0xa6625bd2b260a9c5!8m2!3d21.0439164!4d105.8031278!16s%2Fg%2F11h7f6vjt2?entry=ttu"
								target="_blank"
								rel="noopener"
								display={'block'}
								mih={300}
								h={'100%'}
								w={'100%'}
							></Anchor>
						</Grid.Col>
					</Grid>
				</Container>
			</div>
			{/* <Container size="xl" className={classes.afterFooter}> */}
			{/* <Text size="sm">© 2024 AI Academy Viet Nam.</Text>
			</Container> */}
			{/* <Box className={classes.footerMap}>
				<Image
					src={imgOthers.footerMapIcon}
					w={'100%'}
					h={'auto'}
					alt="footer map"
					loading="lazy"
					width={693}
					height={362}
				/>
			</Box> */}
		</footer>
	);
}
