import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { userState } from '@/store/user/atom';
import { convertToString } from '@/utils/array';
import { queryClient } from '@/utils/query-loader/react-query';
import {
	CACHE_SLIDE,
	useCreateSlide,
	useGetSlideById,
	useUpdateSlide,
} from '@/utils/query-loader/slide.loader';
import { getRuleForms } from '@/utils/validation';
import {
	ActionIcon,
	Anchor,
	Box,
	Button,
	Grid,
	Input,
	LoadingOverlay,
	NumberInput,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconLink, IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';
import { FileWithPath } from '@mantine/dropzone';
import { useState } from 'react';
import { RichEditor } from '../../editor/Editor';
import { ISlide } from '@/types';
import { deleteFile, uploadFile } from '@/utils/services/file.service';
import { removeVietnameseTones } from '@/utils/format-string';
import { DropzoneRender } from '@/components/shared/dropzone/DropzoneRender';

interface Props {
	id?: number;
}

export const SlideModal = ({ id }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const userRecoil = useRecoilValue(userState);
	const [files, setFiles] = useState<(FileWithPath | undefined)[]>([
		undefined,
		undefined,
		undefined,
	]);
	const [dataEditor, setDataEditor] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [pathsNeedDelete, setPathsNeedDelete] = useState<string[]>();
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			order: 1,
		},
		validate: {},
	});

	const getDetail = useGetSlideById({
		id: id!,
		config: {
			enabled: !!id && opened,
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}

				// form.setValues(convertToString(data) as any);
				form.setValues({
					...convertToString(data),
				});
				setDataEditor(data.caption);
			},
		},
	});

	const createQuery = useCreateSlide({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_SLIDE.SEARCH]);
				handleCancel();
			},
		},
	});

	const updateQuery = useUpdateSlide({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				pathsNeedDelete && deleteFile(pathsNeedDelete);
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_SLIDE.SEARCH]);
				handleCancel();
			},
		},
	});

	const handleSubmit = async (values: any) => {
		if (!dataEditor || !(files[0] || values.big_image)) {
			getNotifications('warning', t, t('validation.warning'));
			return;
		}

		setLoading(true);
		const dataPost: ISlide = {
			...values,
			caption: dataEditor,
		};

		if (files) {
			const paths = [];
			if (files[0]) {
				const formData = new FormData();
				formData.append('file', files[0], removeVietnameseTones(files[0].name));
				paths.push(dataPost.big_image);
				const dataUpload = await uploadFile(formData);
				if (dataUpload?.url) dataPost.big_image = dataUpload.url;
			}
			if (files[1]) {
				const formData = new FormData();
				formData.append('file', files[1], removeVietnameseTones(files[1].name));
				dataPost.small_image && paths.push(dataPost.small_image);
				const dataUpload = await uploadFile(formData);
				if (dataUpload?.url) dataPost.small_image = dataUpload.url;
			}
			if (files[2]) {
				const formData = new FormData();
				formData.append('file', files[2], removeVietnameseTones(files[2].name));
				dataPost.preview_thumbnail && paths.push(dataPost.preview_thumbnail);
				const dataUpload = await uploadFile(formData);
				if (dataUpload?.url) dataPost.preview_thumbnail = dataUpload.url;
			}
			id && setPathsNeedDelete(paths);
		}

		if (!id) {
			// Create
			dataPost.created_by_user_id = userRecoil.user_id;
			await createQuery.mutateAsync(dataPost);
		} else {
			dataPost.lu_user_id = userRecoil.user_id;
			await updateQuery.mutateAsync(dataPost);
		}

		setLoading(false);
	};

	const handleCancel = () => {
		setPathsNeedDelete(undefined);
		setFiles([undefined, undefined, undefined]);
		setLoading(false);
		setDataEditor('');
		form.reset();
		close();
	};

	return (
		<>
			{!id ? (
				<Button size="sm" leftSection={<IconPlus size={20} />} onClick={open}>
					{t('global.create')}
				</Button>
			) : (
				<Tooltip label={t('global.edit')}>
					<ActionIcon radius={'md'} variant="default" c="yellow" onClick={open}>
						<IconEdit style={{ width: '80%', height: '80%' }} />
					</ActionIcon>
				</Tooltip>
			)}

			<ModalRender
				opened={opened}
				onClose={handleCancel}
				size={1200}
				title={!id ? t('slides.title_create') : t('slides.title_update')}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: loading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<LoadingOverlay visible={getDetail.isFetching} />
					<Grid gutter={16}>
						<Grid.Col
							span={5}
							display={'flex'}
							style={{
								flexDirection: 'column',
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
						>
							<DropzoneRender
								fileUrl={
									files[0]
										? URL.createObjectURL(files[0])
										: form.getInputProps('big_image').value
											? form.getInputProps('big_image').value
											: ''
								}
								onDrops={(files) =>
									setFiles((prev) => [...files, prev[1], prev[2]])
								}
								limit={2}
								label={t('slides.fields.big_image') + ' (1920 x 720)'}
							/>
							<Input.Error mt={60}>
								{files[0] || form.getInputProps('big_image').value
									? ''
									: t('validation.required')}
							</Input.Error>
						</Grid.Col>
						<Grid.Col
							span={2}
							display={'flex'}
							style={{
								flexDirection: 'column',
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
						>
							<DropzoneRender
								fileUrl={
									files[1]
										? URL.createObjectURL(files[1])
										: form.getInputProps('small_image').value
											? form.getInputProps('small_image').value
											: ''
								}
								onDrops={(files) =>
									setFiles((prev) => [prev[0], ...files, prev[2]])
								}
								limit={1}
								label={t('slides.fields.small_image') + ' (990 × 1487)'}
							/>
						</Grid.Col>
						<Grid.Col span={5}>
							<Grid>
								<Grid.Col
									span={12}
									display={'flex'}
									style={{
										flexDirection: 'column',
										justifyContent: 'flex-start',
										alignItems: 'center',
									}}
								>
									<DropzoneRender
										fileUrl={
											files[2]
												? URL.createObjectURL(files[2])
												: form.getInputProps('preview_thumbnail').value
													? form.getInputProps('preview_thumbnail').value
													: ''
										}
										onDrops={(files) =>
											setFiles((prev) => [prev[0], prev[1], ...files])
										}
										limit={1}
										label={t('slides.fields.preview_thumbnail')}
										h={120}
									/>
								</Grid.Col>

								<Grid.Col span={12} mt={40}>
									<TextInput
										size="sm"
										label={t('slides.fields.preview_link')}
										placeholder={t('slides.fields.preview_link')}
										rightSection={
											<Anchor
												h={20}
												href={
													form.getInputProps('preview_link').value
														? form.getInputProps('preview_link').value
														: undefined
												}
												target="_blank"
												rel="noopener"
												c={
													form.getInputProps('preview_link').value ? '' : 'gray'
												}
											>
												<IconLink stroke={1.4} size={20} />
											</Anchor>
										}
										{...form.getInputProps('preview_link')}
									/>
								</Grid.Col>
							</Grid>
						</Grid.Col>

						<Grid.Col span={4}>
							<TextInput
								size="sm"
								label={t('slides.fields.btn_label')}
								placeholder={t('slides.fields.btn_label')}
								{...form.getInputProps('btn_label')}
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<TextInput
								size="sm"
								label={t('slides.fields.btn_to')}
								placeholder={t('slides.fields.btn_to')}
								rightSection={
									<Anchor
										h={20}
										href={
											form.getInputProps('btn_to').value
												? form.getInputProps('btn_to').value
												: undefined
										}
										target="_blank"
										rel="noopener"
										c={form.getInputProps('btn_to').value ? '' : 'gray'}
									>
										<IconLink stroke={1.4} size={20} />
									</Anchor>
								}
								{...form.getInputProps('btn_to')}
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<NumberInput
								size="sm"
								label={t('slides.fields.order')}
								placeholder={t('slides.fields.order')}
								withAsterisk
								min={0}
								{...form.getInputProps('order')}
							/>
						</Grid.Col>

						<Grid.Col span={12}>
							<Input.Wrapper
								label={t('slides.fields.caption')}
								error={dataEditor ? '' : t('validation.required')}
								withAsterisk
							>
								<RichEditor
									loading={getDetail.isFetching}
									value={dataEditor}
									setValue={setDataEditor}
								/>
							</Input.Wrapper>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
