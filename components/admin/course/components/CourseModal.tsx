import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { userState } from '@/store/user/atom';
import { convertToString } from '@/utils/array';
import { queryClient } from '@/utils/query-loader/react-query';
import {
	CACHE_COURSE,
	useCreateCourse,
	useGetCourseById,
	useUpdateCourse,
} from '@/utils/query-loader/course.loader';
import { getRuleForms } from '@/utils/validation';
import {
	ActionIcon,
	Anchor,
	Box,
	Button,
	Flex,
	Grid,
	Group,
	Input,
	LoadingOverlay,
	ScrollArea,
	Stack,
	TagsInput,
	Text,
	TextInput,
	Textarea,
	Tooltip,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconLink, IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Dispatch, SetStateAction, useState } from 'react';
import { ICourse, ICourseDetail } from '@/types/course';
import { deleteFile, uploadFile } from '@/utils/services/file.service';
import {
	ButtonEdit,
	ButtonTrash,
} from '@/components/mantines/buttons/ButtonGroup';
import _ from 'lodash';

interface Props {
	id?: number;
}

export const CourseModal = ({ id }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const userRecoil = useRecoilValue(userState);
	const [files, setFiles] = useState<FileWithPath[]>();
	const [loading, setLoading] = useState(false);
	const [pathNeedDelete, setPathNeedDelete] = useState<string>();
	const [courseDetail, setCourseDetail] = useState<ICourseDetail[]>([]);
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			course_name: '',
			avatar: '',
			major: [],
			fb_link: '',
			x_link: '',
			ins_link: '',
			linkedin_link: '',
			sort_order: 1,
		},
		validate: {
			course_name: isNotEmpty(t('validation.required')),
			major: isNotEmpty(t('validation.required')),
			sort_order: isNotEmpty(t('validation.required')),
		},
	});

	const getDetail = useGetCourseById({
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
					// major: data?.major.split(', '),
				});
			},
		},
	});

	const createQuery = useCreateCourse({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_COURSE.SEARCH]);
				handleCancel();
			},
		},
	});

	const updateQuery = useUpdateCourse({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				pathNeedDelete && deleteFile(pathNeedDelete);
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_COURSE.SEARCH]);
				handleCancel();
			},
		},
	});

	const handleSubmit = async (values: any) => {
		setLoading(true);
		const dataPost: ICourse = {
			...values,
			major: values.major?.join(', '),
		};

		if (files) {
			const formData = new FormData();
			formData.append('file', files[0]);
			id && setPathNeedDelete(dataPost.thumbnail);
			const dataUpload = await uploadFile(formData);
			if (dataUpload.url) dataPost.thumbnail = dataUpload.url;
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
		setPathNeedDelete(undefined);
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
				size={'100%'}
				title={!id ? t('courses.title_create') : t('courses.title_update')}
				closeOnEscape={false}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: loading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<LoadingOverlay visible={getDetail.isFetching} />
					<Grid gutter={16}>
						<Grid.Col
							span={2}
							display={'flex'}
							style={{
								flexDirection: 'column',
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
						>
							<Box className={'dropzone-wrap'} w={'100%'} h={180}>
								<Input.Label mb={4}>
									{t('courses.fields.thumbnail')}
								</Input.Label>
								<Tooltip label="Upload">
									<Dropzone
										h={'100%'}
										w={'100%'}
										radius={'sm'}
										accept={IMAGE_MIME_TYPE}
										maxSize={2 * 1024 ** 2}
										style={{
											backgroundImage: `url(${
												files
													? URL.createObjectURL(files[0])
													: form.getInputProps('thumbnail').value
														? form.getInputProps('thumbnail').value
														: ''
											})`,
										}}
										bgsz={'contain'}
										bgr={'no-repeat'}
										bgp={'center center'}
										multiple={false}
										onReject={() => {
											getNotifications('error', t, 'File không thể quá 2MB');
										}}
										onDrop={setFiles}
									></Dropzone>
								</Tooltip>
								<Text fz="sm" ta={'center'} py={8}>
									File {'<'} 2MB
								</Text>
							</Box>
						</Grid.Col>
						<Grid.Col span={5}>
							<Grid gutter={16}>
								<Grid.Col span={6}>
									<TextInput
										label={t('courses.fields.course_name')}
										placeholder={t('courses.fields.course_name')}
										withAsterisk
										{...form.getInputProps('course_name')}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<TextInput
										label={t('courses.fields.preview')}
										placeholder={t('courses.fields.preview')}
										rightSection={
											<Anchor
												h={20}
												href={
													form.getInputProps('preview').value
														? form.getInputProps('preview').value
														: undefined
												}
												target="_blank"
												rel="noopener"
												c={form.getInputProps('preview').value ? '' : 'gray'}
											>
												<IconLink stroke={1.4} size={20} />
											</Anchor>
										}
										{...form.getInputProps('preview')}
									/>
								</Grid.Col>

								<Grid.Col span={12}>
									<Textarea
										label={t('courses.fields.description')}
										placeholder={t('courses.fields.description')}
										{...form.getInputProps('description')}
										rows={5}
									/>
								</Grid.Col>
							</Grid>
						</Grid.Col>
						<Grid.Col span={5}>
							<CourseDetailTable
								courseDetail={courseDetail}
								setCourseDetail={setCourseDetail}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};

function CourseDetailTable({
	course_id,
	courseDetail,
	setCourseDetail,
}: {
	course_id?: string;
	courseDetail: ICourseDetail[];
	setCourseDetail: Dispatch<SetStateAction<ICourseDetail[]>>;
}): JSX.Element {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			name_detail: '',
			description: '',
			list_videos: [],
		},
		validate: {
			name_detail: isNotEmpty(t('validation.required')),
			description: isNotEmpty(t('validation.required')),
			list_videos: (values: string[]) => {
				return values?.length > 0 &&
					values.every((i) => /^[^\d:]+:\d+$/.test(i))
					? null
					: t('validation.pattern');
			},
		},
	});

	const handleSubmit = (values: any) => {
		const dataPost: ICourseDetail = {
			name_detail: values.name_detail,
			description: values.description,
			list_videos: values.list_videos,
			total_time: values.list_videos.reduce((prev: number, curr: string) => {
				const l = curr.split(':');
				return prev + Number(l[1]);
			}, 0),
		};

		if (values.isEditing) {
			const dataClone = JSON.parse(
				JSON.stringify(courseDetail),
			) as ICourseDetail[];

			const index = _.findIndex(
				dataClone,
				(i) => i.id === values.id || i.course_detail_id === values.id,
			);

			dataClone[index] = { ...dataClone[index], ...dataPost };

			setCourseDetail(dataClone);

			handleCancel();
			return;
		}

		setCourseDetail((prev) => [
			{
				...dataPost,
				id: crypto.randomUUID(),
			},
			...prev,
		]);
		handleCancel();
	};

	const handleOpen = (data?: any) => {
		if (data)
			form.setValues({
				...data,
				isEditing: true,
				list_videos:
					typeof data.list_videos === 'string'
						? data.list_videos.split(', ')
						: data.list_videos,
			});

		open();
	};

	const handleCancel = () => {
		form.reset();
		close();
	};

	const handleDelete = (id?: string | number) => {
		const dataClone = JSON.parse(
			JSON.stringify(courseDetail),
		) as ICourseDetail[];
		setCourseDetail(
			dataClone.filter((i) => i.id !== id && i.course_detail_id !== id),
		);
	};

	return (
		<>
			<Flex justify={'space-between'} align={'center'}>
				<Text fw={900}>Chi tiết khóa học</Text>
				<Button onClick={handleOpen}>Thêm chi tiết</Button>
			</Flex>
			<ScrollArea h={180}>
				<Stack py={8}>
					{courseDetail?.map((item, index) => (
						<Flex
							key={index}
							justify={'space-between'}
							align={'center'}
							style={{ borderBottom: '1px solid #eee' }}
							py={8}
						>
							{item.name_detail}
							<Group gap={4}>
								<ButtonEdit size="xs" onClick={() => handleOpen(item)} />
								<ButtonTrash
									size="xs"
									onClick={() => handleDelete(item.id || item.course_detail_id)}
								/>
							</Group>
						</Flex>
					))}
				</Stack>
			</ScrollArea>

			<ModalRender
				title={
					!course_id
						? t('courses.title_detail_create')
						: t('courses.title_detail_update')
				}
				opened={opened}
				onClose={handleCancel}
				footer={{
					onOk: form.onSubmit(handleSubmit),
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<Grid gutter={16}>
						<Grid.Col span={12}>
							<TextInput
								label={t('courses.fields.name_detail')}
								placeholder={t('courses.fields.name_detail')}
								withAsterisk
								{...form.getInputProps('name_detail')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<Textarea
								label={t('courses.fields.description')}
								placeholder={t('courses.fields.description')}
								withAsterisk
								{...form.getInputProps('description')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<TagsInput
								label={t('courses.fields.list_videos')}
								placeholder={'Tên_bài:số_phút'}
								withAsterisk
								{...form.getInputProps('list_videos')}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
}
