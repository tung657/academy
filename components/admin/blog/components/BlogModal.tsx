import {
	ActionIcon,
	Box,
	Button,
	Grid,
	Input,
	LoadingOverlay,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { dataTypesBlogs } from '@/components/blogs/data/data-fake';
import { SelectRender } from '@/components/mantines/inputs/SelectRender';
import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { DropzoneRender } from '@/components/shared/dropzone/DropzoneRender';
import { userState } from '@/store/user/atom';
import { IBlog } from '@/types/blog';
import { convertToString } from '@/utils/array';
import {
	getReadingTime,
	removeVietnameseTones,
	truncateHtml,
} from '@/utils/format-string';
import {
	CACHE_BLOG,
	useCreateBlog,
	useGetBlogById,
	useUpdateBlog,
} from '@/utils/query-loader/blog.loader';
import { queryClient } from '@/utils/query-loader/react-query';
import { useGetResearchTypeDropdown } from '@/utils/query-loader/research-type.loader';
import { deleteFile, uploadFile } from '@/utils/services/file.service';
import { getRuleForms } from '@/utils/validation';

import { RichEditor } from '../../editor/Editor';

interface Props {
	id?: number;
}

export const BlogModal = ({ id }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const userRecoil = useRecoilValue(userState);
	const [files, setFiles] = useState<FileWithPath[]>();
	const [dataEditor, setDataEditor] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [pathNeedDelete, setPathNeedDelete] = useState<string>();
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			title: '',
			topic_id: '',
		},
		validate: {
			title: isNotEmpty(t('validation.required')),
			topic_id: isNotEmpty(t('validation.required')),
		},
	});

	const getDetail = useGetBlogById({
		id: id!,
		config: {
			enabled: !!id && opened,
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}

				form.setValues({
					...convertToString(data),
				});
				setDataEditor(data.content);
			},
		},
	});

	const { data: researchOptions, isLoading: loadingResearch } =
		useGetResearchTypeDropdown({
			config: { enabled: opened },
		});

	const createQuery = useCreateBlog({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_BLOG.SEARCH]);
				handleCancel();
			},
		},
	});

	const updateQuery = useUpdateBlog({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				pathNeedDelete && deleteFile(pathNeedDelete);
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_BLOG.SEARCH]);
				handleCancel();
			},
		},
	});

	const handleSubmit = async (values: any) => {
		setLoading(true);
		const dataPost: IBlog = {
			...values,
			content: dataEditor,
			read_time: getReadingTime(dataEditor),
			meta_content: truncateHtml(dataEditor, 150),
		};

		if (files) {
			const formData = new FormData();
			formData.append('file', files[0], removeVietnameseTones(files[0].name));
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
		setFiles(undefined);
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
				size={'70%'}
				title={
					!id
						? t('blog-management.title_create')
						: t('blog-management.title_update')
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
							mb={40}
						>
							<DropzoneRender
								fileUrl={
									files
										? URL.createObjectURL(files[0])
										: form.getInputProps('thumbnail').value
											? form.getInputProps('thumbnail').value
											: ''
								}
								onDrops={setFiles}
								limit={2}
							/>
						</Grid.Col>
						<Grid.Col span={8}>
							<Grid gutter={16}>
								<Grid.Col span={12}>
									<TextInput
										size="sm"
										label={t('blog-management.fields.title')}
										placeholder={t('blog-management.fields.title')}
										withAsterisk
										{...form.getInputProps('title')}
									/>
								</Grid.Col>

								<Grid.Col span={12}>
									<SelectRender
										size="sm"
										label={t('blog-management.fields.research_type_name')}
										placeholder={t('blog-management.fields.research_type_name')}
										withAsterisk
										data={[...(researchOptions || []), ...dataTypesBlogs]}
										loading={loadingResearch}
										{...form.getInputProps('topic_id')}
									/>
								</Grid.Col>
							</Grid>
						</Grid.Col>

						<Grid.Col span={12}>
							<Input.Wrapper
								label={t('blog-management.fields.content')}
								withAsterisk
								error={!dataEditor && t('validation.required')}
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
