import { getNotifications } from '@/components/mantines/notification/getNotifications';
import {
	Box,
	Flex,
	Input,
	MantineRadius,
	Text,
	Tooltip,
	rem,
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface Props {
	isInput?: boolean;
	accept?: string[];
	h?: number;
	label?: string;
	fileUrl: string;
	onDrops: (files: FileWithPath[]) => void;
	limit?: number;
	radius?: MantineRadius;
	w?: string | number;
}

export const DropzoneRender = ({
	isInput = true,
	accept = IMAGE_MIME_TYPE,
	label = 'Thumbnail',
	h = 180,
	fileUrl,
	onDrops,
	limit = 0.1,
	radius = 'sm',
	w = '100%',
}: Props): JSX.Element => {
	const t = useTranslations();

	const limitText = limit >= 1 ? `${limit}MB` : `${limit * 1000}KB`;

	return isInput ? (
		<>
			<Box className={'dropzone-wrap'} w={w} h={h}>
				<Input.Label mb={4}>{label}</Input.Label>
				<Tooltip label="Upload">
					<Dropzone
						h={'100%'}
						w={'100%'}
						radius={radius}
						accept={accept}
						maxSize={limit * 1024 ** 2}
						style={{
							backgroundImage: `url(${fileUrl})`,
						}}
						bgsz={'contain'}
						bgr={'no-repeat'}
						bgp={'center center'}
						multiple={false}
						onReject={() => {
							getNotifications('error', t, `File không thể quá ${limitText}`);
						}}
						onDrop={onDrops}
					>
						{!fileUrl && (
							<Flex
								justify="center"
								align={'center'}
								direction={radius === '50%' ? 'column' : 'row'}
								gap="md"
								mih={`calc(${h}px - 32px)`}
								style={{ pointerEvents: 'none' }}
							>
								<IconPhoto
									style={{
										width: rem(34),
										height: rem(34),
										color: 'var(--mantine-color-dimmed)',
									}}
									stroke={1.5}
								/>
								<div>
									<Text size="md" c="dimmed" inline>
										Upload file tại đây
									</Text>
								</div>
							</Flex>
						)}
					</Dropzone>
				</Tooltip>
				<Text fz="sm" py={8} ta={'center'}>
					File {'<'} {limitText}
				</Text>
			</Box>
		</>
	) : (
		<>dsd</>
	);
};
