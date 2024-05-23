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
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { DropzoneRender } from '@/components/shared/dropzone/DropzoneRender';
import { userState } from '@/store/user/atom';
import { IPartner } from '@/types/partner';
import { convertToString } from '@/utils/array';
import { removeVietnameseTones } from '@/utils/format-string';
import {
	CACHE_PARTNER,
	useCreatePartner,
	useGetPartnerById,
	useUpdatePartner,
} from '@/utils/query-loader/partner.loader';
import { queryClient } from '@/utils/query-loader/react-query';
import { deleteFile, uploadFile } from '@/utils/services/file.service';
import { getRuleForms } from '@/utils/validation';

interface Props {
	id?: number;
}

export const PartnerModal = ({ id }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const userRecoil = useRecoilValue(userState);
	const [files, setFiles] = useState<FileWithPath[]>();
	const [loading, setLoading] = useState(false);
	const [pathNeedDelete, setPathNeedDelete] = useState<string>();
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			partner_name: '',
		},
	});

	const getDetail = useGetPartnerById({
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
			},
		},
	});

	const createQuery = useCreatePartner({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_PARTNER.SEARCH]);
				handleCancel();
			},
		},
	});

	const updateQuery = useUpdatePartner({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				pathNeedDelete && deleteFile(pathNeedDelete);
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_PARTNER.SEARCH]);
				handleCancel();
			},
		},
	});

	const handleSubmit = async (values: any) => {
		if (!(files || values.thumbnail)) {
			getNotifications('warning', t, t('validation.warning'));
			return;
		}

		setLoading(true);
		const dataPost: IPartner = {
			...values,
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
				size={900}
				title={!id ? t('partners.title_create') : t('partners.title_update')}
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
								label={t('partners.fields.thumbnail')}
							/>
							<Input.Error mt={60}>
								{files || form.getInputProps('thumbnail').value
									? ''
									: t('validation.required')}
							</Input.Error>
						</Grid.Col>
						<Grid.Col span={8}>
							<Grid gutter={16}>
								<Grid.Col span={12}>
									<TextInput
										size="sm"
										label={t('partners.fields.partner_name')}
										placeholder={t('partners.fields.partner_name')}
										{...form.getInputProps('partner_name')}
									/>
								</Grid.Col>
							</Grid>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
