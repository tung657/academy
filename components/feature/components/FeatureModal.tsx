'use client';

import {
	ButtonEdit,
	ButtonPlus,
} from '@/components/mantines/buttons/ButtonGroup';
import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { featureSelectedState } from '@/store/feature/atom';
import { userState } from '@/store/user/atom';
import { IFeature, IFeatureDataNode } from '@/types';
import {
	CACHE_FEATURE,
	getNodeTree,
	queryClient,
	removeEmptyObject,
	useCreateFeature,
	useGetFeatureById,
	useUpdateFeature,
} from '@/utils';
import { getRuleForms } from '@/utils/validation';
import {
	Box,
	Card,
	Grid,
	InputLabel,
	LoadingOverlay,
	Menu,
	NumberInput,
	TextInput,
	Textarea,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import Tree from 'rc-tree';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

interface Props {
	isCreate?: boolean;
	treeData?: any;
}

export const FeatureModal = ({
	isCreate = false,
	treeData,
}: Props): JSX.Element => {
	const [opened, { open, close }] = useDisclosure();
	const t = useTranslations();
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			function_name: '',
			sort_order: 0,
			url: '',
			description: '',
		},
		validate: {
			function_name: isNotEmpty(t('validation.required')),
			url: isNotEmpty(t('validation.required')),
		},
	});

	const featureSelected = useRecoilValue(featureSelectedState);
	const userProfile = useRecoilValue(userState);
	const [parentFeature, setParentFeature] = useState<
		IFeatureDataNode | undefined
	>(featureSelected);

	const { isInitialLoading: loadingFeature } = useGetFeatureById({
		id: Number(featureSelected?.key)!,
		config: {
			enabled: !isCreate && opened && !!featureSelected?.key,
			onSuccess: (data) => {
				if (data.success === false) {
					getNotifications('error', t, data.message);
					return;
				}

				const parent = getNodeTree(treeData, data.parent_id);
				const urls = data?.url?.split('/');

				// setUrl(urls[urls.length - 1]);
				setParentFeature({ ...parent });
				form.setValues({
					...removeEmptyObject(data),
					url: urls[urls.length - 1],
				});
			},
		},
	});

	const createFeature = useCreateFeature({
		config: {
			onSuccess: async (data) => {
				if (data.success === false) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				await queryClient.invalidateQueries([CACHE_FEATURE.SEARCH]);
				handleCloseModal();
			},
			onError: (error) => {
				getNotifications('error', t, error.message);
			},
		},
	});

	const updateFeature = useUpdateFeature({
		config: {
			onSuccess: async (data) => {
				if (data.success === false) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				await queryClient.invalidateQueries([CACHE_FEATURE.SEARCH]);
				handleCloseModal();
			},
			onError: (error) => {
				getNotifications('error', t, error.message);
			},
		},
	});

	const handleSubmit = (values: any) => {
		const dataPost: IFeature = {
			...values,
			url: (parentFeature?.url || '') + '/' + values.url,
			parent_id: parentFeature?.key || 0,
			level: parentFeature?.level ? parentFeature.level + 1 : 1,
		};

		if (isCreate) {
			dataPost.created_by_user_id = userProfile.user_id;
			createFeature.mutate(dataPost);
		} else {
			dataPost.lu_user_id = userProfile.user_id;
			updateFeature.mutate(dataPost);
		}
	};

	const handleOpenModal = () => {
		if (isCreate) {
			form.reset();
			setParentFeature(featureSelected);
		}
		open();
	};

	const handleCloseModal = () => {
		close();
	};

	return (
		<>
			{isCreate ? (
				<ButtonPlus onClick={handleOpenModal} />
			) : (
				<ButtonEdit onClick={handleOpenModal} disabled={!featureSelected} />
			)}
			<ModalRender
				opened={opened}
				onClose={handleCloseModal}
				title={
					isCreate ? t('features.title_create') : t('features.title_update')
				}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: updateFeature.isLoading || createFeature.isLoading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<LoadingOverlay visible={loadingFeature} />
					<Grid gutter={16}>
						<Grid.Col>
							<Menu transitionProps={{ transition: 'pop-top-left' }}>
								<Menu.Target>
									<div>
										<InputLabel>{t('features.fields.parent')}</InputLabel>
										<TextInput
											onChange={() => {}}
											value={
												parentFeature?.title?.toString() ||
												'Nhóm lớn nhất (mặc định)'
											}
										/>
									</div>
								</Menu.Target>

								<Menu.Dropdown w={500}>
									<Card>
										<Tree
											defaultExpandParent
											autoExpandParent
											defaultExpandAll
											selectedKeys={parentFeature ? [parentFeature.key] : [0]}
											onSelect={(_, { selectedNodes }: any) => {
												setParentFeature(selectedNodes?.[0]);
											}}
											treeData={treeData}
											height={300}
										/>
									</Card>
								</Menu.Dropdown>
							</Menu>
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 6 }}>
							<TextInput
								withAsterisk
								label={t('features.fields.function_name')}
								{...form.getInputProps('function_name')}
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 6 }}>
							<NumberInput
								withAsterisk
								min={0}
								label={t('features.fields.sort_order')}
								{...form.getInputProps('sort_order')}
							/>
						</Grid.Col>
						<Grid.Col>
							<TextInput
								required
								label={
									t('features.fields.url') +
									` (${parentFeature?.url || ''}/${form.values?.url || ''})`
								}
								{...form.getInputProps('url')}
							/>
						</Grid.Col>
						<Grid.Col>
							<Textarea
								label={t('features.fields.description')}
								{...form.getInputProps('description')}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};