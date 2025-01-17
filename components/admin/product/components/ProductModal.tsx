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
	Textarea,
	Tooltip,
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconLink, IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { DropzoneRender } from '@/components/shared/dropzone/DropzoneRender';
import { userState } from '@/store/user/atom';
import { IProduct } from '@/types';
import { convertToString } from '@/utils/array';
import {
	extractTextFromHtml,
	removeVietnameseTones,
} from '@/utils/format-string';
import {
	CACHE_PRODUCT,
	useCreateProduct,
	useGetProductById,
	useUpdateProduct,
} from '@/utils/query-loader/product.loader';
import { queryClient } from '@/utils/query-loader/react-query';
import { deleteFile, uploadFile } from '@/utils/services/file.service';
import { getRuleForms } from '@/utils/validation';

import { RichEditor } from '../../editor/Editor';

interface Props {
	id?: number;
}

export const ProductModal = ({ id }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const userRecoil = useRecoilValue(userState);
	const [files, setFiles] = useState<FileWithPath[]>();
	const [dataEditor, setDataEditor] = useState<string>('');
	const [dataEnEditor, setDataEnEditor] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [pathNeedDelete, setPathNeedDelete] = useState<string>();
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			product_name: '',
			link: '',
			slogan: '',
			sort_order: 1,
			description: '',
			en_product_name: '',
			en_description: '',
			en_slogan: '',
		},
		validate: {
			product_name: isNotEmpty(t('validation.required')),
			link: isNotEmpty(t('validation.required')),
			sort_order: isNotEmpty(t('validation.required')),
			description: isNotEmpty(t('validation.required')),
		},
	});

	const getDetail = useGetProductById({
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
				setDataEditor(data.content);
				setDataEnEditor(data.en_content);
			},
		},
	});

	const createQuery = useCreateProduct({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_PRODUCT.SEARCH]);
				handleCancel();
			},
		},
	});

	const updateQuery = useUpdateProduct({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				pathNeedDelete && deleteFile(pathNeedDelete);
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_PRODUCT.SEARCH]);
				handleCancel();
			},
		},
	});

	const handleSubmit = async (values: any) => {
		setLoading(true);
		const dataPost: IProduct = {
			...values,
			content: extractTextFromHtml(dataEditor) ? dataEditor : '',
			en_content: extractTextFromHtml(dataEnEditor) ? dataEnEditor : '',
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
		setDataEnEditor('');
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
				title={!id ? t('products.title_create') : t('products.title_update')}
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
										size="sm"
										label={t('products.fields.product_name')}
										placeholder={t('products.fields.product_name')}
										withAsterisk
										{...form.getInputProps('product_name')}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<TextInput
										size="sm"
										label={t('products.fields.en_product_name')}
										placeholder={t('products.fields.en_product_name')}
										{...form.getInputProps('en_product_name')}
									/>
								</Grid.Col>

								<Grid.Col span={6}>
									<TextInput
										size="sm"
										label={t('products.fields.slogan')}
										placeholder={t('products.fields.slogan')}
										{...form.getInputProps('slogan')}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<TextInput
										size="sm"
										label={t('products.fields.en_slogan')}
										placeholder={t('products.fields.en_slogan')}
										{...form.getInputProps('en_slogan')}
									/>
								</Grid.Col>

								<Grid.Col span={6}>
									<TextInput
										size="sm"
										label={t('products.fields.link')}
										placeholder={t('products.fields.link')}
										rightSection={
											<Anchor
												h={20}
												href={
													form.getInputProps('link').value
														? form.getInputProps('link').value
														: undefined
												}
												target="_blank"
												rel="noopener"
												c={form.getInputProps('link').value ? '' : 'gray'}
											>
												<IconLink stroke={1.4} size={20} />
											</Anchor>
										}
										withAsterisk
										{...form.getInputProps('link')}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<NumberInput
										size="sm"
										min={1}
										label={t('products.fields.sort_order')}
										placeholder={t('products.fields.sort_order')}
										withAsterisk
										{...form.getInputProps('sort_order')}
									/>
								</Grid.Col>
							</Grid>
						</Grid.Col>
						<Grid.Col span={12}>
							<Textarea
								label={t('products.fields.description')}
								placeholder={t('products.fields.description')}
								withAsterisk
								rows={3}
								{...form.getInputProps('description')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<Textarea
								label={t('products.fields.en_description')}
								placeholder={t('products.fields.en_description')}
								rows={3}
								{...form.getInputProps('en_description')}
							/>
						</Grid.Col>

						<Grid.Col span={12}>
							<Input.Label>{t('products.fields.content')}</Input.Label>
							<RichEditor
								loading={getDetail.isFetching}
								value={dataEditor}
								setValue={setDataEditor}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<Input.Label>{t('products.fields.en_content')}</Input.Label>
							<RichEditor
								loading={getDetail.isFetching}
								value={dataEnEditor}
								setValue={setDataEnEditor}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
