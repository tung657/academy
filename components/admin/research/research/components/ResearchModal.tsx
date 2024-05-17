import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { userState } from '@/store/user/atom';
import { convertToString } from '@/utils/array';
import { queryClient } from '@/utils/query-loader/react-query';
import {
	CACHE_RESEARCH,
	useCreateResearch,
	useGetResearchById,
	useUpdateResearch,
} from '@/utils/query-loader/research.loader';
import { getRuleForms } from '@/utils/validation';
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
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';
import { FileWithPath } from '@mantine/dropzone';
import { useState } from 'react';
import { RichEditorBasic } from '../../../editor/Editor';
import { IResearch } from '@/types/research';
import { deleteFile, uploadFile } from '@/utils/services/file.service';
import { removeVietnameseTones } from '@/utils/format-string';
import { useGetResearchTypeDropdown } from '@/utils/query-loader/research-type.loader';
import { SelectRender } from '@/components/mantines/inputs/SelectRender';
import { DropzoneRender } from '@/components/shared/dropzone/DropzoneRender';

interface Props {
	id?: number;
}

export const ResearchModal = ({ id }: Props): JSX.Element => {
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
			research_name: '',
			research_type_id: '',
			slogan: '',
		},
		validate: {
			research_name: isNotEmpty(t('validation.required')),
			research_type_id: isNotEmpty(t('validation.required')),
		},
	});

	const getDetail = useGetResearchById({
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
				setDataEditor(data.description);
			},
		},
	});

	const createQuery = useCreateResearch({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_RESEARCH.SEARCH]);
				handleCancel();
			},
		},
	});

	const updateQuery = useUpdateResearch({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				pathNeedDelete && deleteFile(pathNeedDelete);
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_RESEARCH.SEARCH]);
				handleCancel();
			},
		},
	});

	const { data: typeOptions, isFetching: loadingType } =
		useGetResearchTypeDropdown({
			config: {
				enabled: opened,
			},
		});

	const handleSubmit = async (values: any) => {
		setLoading(true);
		const dataPost: IResearch = {
			...values,
			slogan: values.slogan ? values.slogan : 'Nghiên cứu của AIA',
			description: dataEditor,
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
					!id ? t('researches.title_create') : t('researches.title_update')
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
								<Grid.Col span={6}>
									<TextInput
										label={t('researches.fields.research_name')}
										placeholder={t('researches.fields.research_name')}
										withAsterisk
										{...form.getInputProps('research_name')}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<SelectRender
										label={t('researches.fields.research_type_name')}
										placeholder={t('researches.fields.research_type_name')}
										withAsterisk
										data={
											typeOptions && typeOptions?.length > 0 ? typeOptions : []
										}
										loading={loadingType}
										{...form.getInputProps('research_type_id')}
									/>
								</Grid.Col>

								<Grid.Col span={12}>
									<TextInput
										label={t('researches.fields.slogan')}
										placeholder={t('researches.fields.slogan')}
										{...form.getInputProps('slogan')}
									/>
								</Grid.Col>
							</Grid>
						</Grid.Col>
						<Grid.Col span={12} mt={48}>
							<Input.Label>{t('researches.fields.description')}</Input.Label>
							<RichEditorBasic
								loading={getDetail.isFetching}
								value={dataEditor}
								setValue={setDataEditor}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};