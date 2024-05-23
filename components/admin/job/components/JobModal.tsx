import {
	ActionIcon,
	Box,
	Button,
	Grid,
	Input,
	LoadingOverlay,
	NumberInput,
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

import { SelectRender } from '@/components/mantines/inputs/SelectRender';
import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { DropzoneRender } from '@/components/shared/dropzone/DropzoneRender';
import { userState } from '@/store/user/atom';
import { IJob } from '@/types/job';
import { convertToString } from '@/utils/array';
import { patterns, removeVietnameseTones } from '@/utils/format-string';
import { useGetBranchDropdown } from '@/utils/query-loader/branch.loader';
import {
	CACHE_JOB,
	useCreateJob,
	useGetJobById,
	useUpdateJob,
} from '@/utils/query-loader/job.loader';
import { queryClient } from '@/utils/query-loader/react-query';
import { deleteFile, uploadFile } from '@/utils/services/file.service';
import { getRuleForms } from '@/utils/validation';

import { RichEditor } from '../../editor/Editor';

interface Props {
	id?: number;
}

export const JobModal = ({ id }: Props): JSX.Element => {
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
			job_name: '',
			icon: '',
			type_time: '',
			address: '',
			salary: '',
			job_description: '',
		},
		validate: {
			job_name: (value) => patterns.name(value, t),
			type_time: isNotEmpty(t('validation.required')),
			address: isNotEmpty(t('validation.required')),
			salary: isNotEmpty(t('validation.required')),
		},
	});

	const getDetail = useGetJobById({
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
				setDataEditor(data.job_description);
			},
		},
	});

	const createQuery = useCreateJob({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_JOB.SEARCH]);
				handleCancel();
			},
		},
	});

	const updateQuery = useUpdateJob({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				pathNeedDelete && deleteFile(pathNeedDelete);
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_JOB.SEARCH]);
				handleCancel();
			},
		},
	});

	const { data: branchOptions, isFetching: loadingBranch } =
		useGetBranchDropdown({
			config: {
				enabled: opened,
			},
		});

	const handleSubmit = async (values: any) => {
		if (!dataEditor) {
			getNotifications('warning', t, t('validation.warning'));
			return;
		}
		setLoading(true);
		const dataPost: IJob = {
			...values,
			job_description: dataEditor,
		};

		if (files) {
			const formData = new FormData();
			formData.append('file', files[0], removeVietnameseTones(files[0].name));
			id && setPathNeedDelete(dataPost.icon);
			const dataUpload = await uploadFile(formData);
			if (dataUpload.url) dataPost.icon = dataUpload.url;
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
				title={!id ? t('jobs.title_create') : t('jobs.title_update')}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: loading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<LoadingOverlay visible={getDetail.isFetching} />
					<Grid gutter={16}>
						<Grid.Col
							span={3}
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
										: form.getInputProps('icon').value
											? form.getInputProps('icon').value
											: ''
								}
								onDrops={setFiles}
								limit={0.1}
								h={130}
								label={t('jobs.fields.icon')}
								{...form.getInputProps('icon')}
							/>
						</Grid.Col>
						<Grid.Col span={9}>
							<Grid gutter={16}>
								<Grid.Col span={6}>
									<TextInput
										size="sm"
										label={t('jobs.fields.job_name')}
										placeholder={t('jobs.fields.job_name')}
										withAsterisk
										{...form.getInputProps('job_name')}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<SelectRender
										data={['Full-time', 'Part-time']}
										size="sm"
										defaultValue={'Full-time'}
										withAsterisk
										label={t('jobs.fields.type_time')}
										placeholder={t('jobs.fields.type_time')}
										{...form.getInputProps('type_time')}
									/>
								</Grid.Col>

								<Grid.Col span={6}>
									<SelectRender
										data={branchOptions ? branchOptions : []}
										loading={loadingBranch}
										size="sm"
										withAsterisk
										label={t('jobs.fields.address')}
										placeholder={t('jobs.fields.address')}
										{...form.getInputProps('address')}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<NumberInput
										size="sm"
										min={0}
										suffix="VNĐ"
										label={t('jobs.fields.salary')}
										placeholder={t('jobs.fields.salary')}
										withAsterisk
										allowDecimal={false}
										thousandSeparator=","
										{...form.getInputProps('salary')}
									/>
								</Grid.Col>
							</Grid>
						</Grid.Col>

						<Grid.Col span={12} mt={24}>
							<Input.Wrapper
								label={t('jobs.fields.job_description')}
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
