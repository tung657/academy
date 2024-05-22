import { Box, Center, Image, Stack, Text } from '@mantine/core';
import { useTranslations } from 'use-intl';
import emptyIcon from '@/assets/svgs/empty.svg';
import { ScrollMotion } from '../shared/motion/ScrollMotion';

export const Empty = (): JSX.Element => {
	const t = useTranslations();

	return (
		<Box w={'100%'}>
			<Center>
				<ScrollMotion>
					<Stack justify="center">
						<div>
							<Image src={emptyIcon.src} alt="icons" />
						</div>
						<Text ta={'center'} fw={500}>
							{t('global.empty')}
						</Text>
					</Stack>
				</ScrollMotion>
			</Center>
		</Box>
	);
};
