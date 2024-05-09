import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { userState } from '@/store/user/atom';
import { convertToString } from '@/utils/array';
import { queryClient } from '@/utils/query-loader/react-query';
import {
	CACHE_INSTRUCTOR,
	useCreateInstructor,
	useGetInstructorById,
	useUpdateInstructor,
} from '@/utils/query-loader/instructor.loader';
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
	TagsInput,
	Text,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconLink, IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';
import { IInstructor } from '@/types/instructor';
import { uploadFile } from '@/utils/services/file.service';

interface Props {
	id?: number;
}

export const InstructorModal = ({ id }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const userRecoil = useRecoilValue(userState);
	const [files, setFiles] = useState<FileWithPath[]>();
	const [loading, setLoading] = useState(false);
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			instructor_name: '',
			avatar: '',
			major: [],
			fb_link: '',
			x_link: '',
			ins_link: '',
			linkedin_link: '',
			sort_order: 1,
		},
		validate: {
			instructor_name: isNotEmpty(t('validation.required')),
			major: isNotEmpty(t('validation.required')),
			sort_order: isNotEmpty(t('validation.required')),
		},
	});

	const getDetail = useGetInstructorById({
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
					major: data?.major.split(', '),
				});
			},
		},
	});

	const createQuery = useCreateInstructor({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_INSTRUCTOR.SEARCH]);
				handleCancel();
			},
		},
	});

	const updateQuery = useUpdateInstructor({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_INSTRUCTOR.SEARCH]);
				handleCancel();
			},
		},
	});

	const handleSubmit = async (values: any) => {
		setLoading(true);
		const dataPost: IInstructor = {
			...values,
			major: values.major?.join(', '),
		};

		if (files) {
			const formData = new FormData();
			formData.append('file', files[0]);
			const dataUpload = await uploadFile(formData);
			if (dataUpload.url) dataPost.avatar = dataUpload.url;
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
		form.reset();
		close();
	};

	return (
		<>
			{!id ? (
				<Button leftSection={<IconPlus size={20} />} onClick={open}>
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
				size={'70%'}
				title={
					!id ? t('instructors.title_create') : t('instructors.title_update')
				}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: loading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<LoadingOverlay visible={getDetail.isFetching} />
					<Grid gutter={16}>
						<Grid.Col
							span={4}
							display={'flex'}
							style={{
								flexDirection: 'column',
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
						>
							<Box className={'dropzone-wrap'} w={'100%'} h={200}>
								<Input.Label mb={4}>
									{t('instructors.fields.avatar')}
								</Input.Label>
								<Tooltip label="Upload">
									<Dropzone
										h={'100%'}
										w={'100%'}
										radius={'sm'}
										accept={IMAGE_MIME_TYPE}
										maxSize={3 * 1024 ** 2}
										style={{
											backgroundImage: `url(${
												files
													? URL.createObjectURL(files[0])
													: form.getInputProps('avatar').value
														? form.getInputProps('avatar').value
														: ''
											})`,
										}}
										bgsz={'contain'}
										bgr={'no-repeat'}
										bgp={'center center'}
										multiple={false}
										onReject={() => {
											getNotifications('error', t, 'File không thể quá 1MB');
										}}
										onDrop={setFiles}
									></Dropzone>
								</Tooltip>
							</Box>
							<Text fz="sm" py={8}>
								File {'<'} 3MB
							</Text>
						</Grid.Col>
						<Grid.Col span={8}>
							<Grid gutter={16}>
								<Grid.Col span={6}>
									<TextInput
										label={t('instructors.fields.instructor_name')}
										placeholder={t('instructors.fields.instructor_name')}
										withAsterisk
										{...form.getInputProps('instructor_name')}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<NumberInput
										min={1}
										label={t('instructors.fields.sort_order')}
										placeholder={t('instructors.fields.sort_order')}
										withAsterisk
										{...form.getInputProps('sort_order')}
									/>
								</Grid.Col>

								<Grid.Col span={6}>
									<TextInput
										label={t('instructors.fields.fb_link')}
										placeholder={t('instructors.fields.fb_link')}
										rightSection={
											<Anchor
												h={20}
												href={
													form.getInputProps('fb_link').value
														? form.getInputProps('fb_link').value
														: undefined
												}
												target="_blank"
												rel="noopener"
												c={form.getInputProps('fb_link').value ? '' : 'gray'}
											>
												<IconLink stroke={1.4} size={20} />
											</Anchor>
										}
										{...form.getInputProps('fb_link')}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<TextInput
										label={t('instructors.fields.x_link')}
										placeholder={t('instructors.fields.x_link')}
										rightSection={
											<Anchor
												h={20}
												href={
													form.getInputProps('x_link').value
														? form.getInputProps('x_link').value
														: undefined
												}
												target="_blank"
												rel="noopener"
												c={form.getInputProps('x_link').value ? '' : 'gray'}
											>
												<IconLink stroke={1.4} size={20} />
											</Anchor>
										}
										{...form.getInputProps('x_link')}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<TextInput
										label={t('instructors.fields.ins_link')}
										placeholder={t('instructors.fields.ins_link')}
										rightSection={
											<Anchor
												h={20}
												href={
													form.getInputProps('ins_link').value
														? form.getInputProps('ins_link').value
														: undefined
												}
												target="_blank"
												rel="noopener"
												c={form.getInputProps('ins_link').value ? '' : 'gray'}
											>
												<IconLink stroke={1.4} size={20} />
											</Anchor>
										}
										{...form.getInputProps('ins_link')}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<TextInput
										label={t('instructors.fields.linkedin_link')}
										placeholder={t('instructors.fields.linkedin_link')}
										rightSection={
											<Anchor
												h={20}
												href={
													form.getInputProps('linkedin_link').value
														? form.getInputProps('linkedin_link').value
														: undefined
												}
												target="_blank"
												rel="noopener"
												c={
													form.getInputProps('linkedin_link').value
														? ''
														: 'gray'
												}
											>
												<IconLink stroke={1.4} size={20} />
											</Anchor>
										}
										{...form.getInputProps('linkedin_link')}
									/>
								</Grid.Col>
							</Grid>
						</Grid.Col>
						<Grid.Col span={12}>
							<TagsInput
								withAsterisk
								maxTags={3}
								label={t('instructors.fields.major')}
								placeholder={t('instructors.fields.major')}
								{...form.getInputProps('major')}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
