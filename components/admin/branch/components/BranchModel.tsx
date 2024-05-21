import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { userState } from '@/store/user/atom';
import { convertToString } from '@/utils/array';
import { queryClient } from '@/utils/query-loader/react-query';

import { getRuleForms } from '@/utils/validation';
import {
	ActionIcon,
	Anchor,
	Box,
	Button,
	Grid,
	LoadingOverlay,
	TextInput,
	Textarea,
	Tooltip,
} from '@mantine/core';
import { isEmail, isNotEmpty, matches, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconLink, IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';
import {
	CACHE_BRANCH,
	useCreateBranch,
	useGetBranchById,
	useUpdateBranch,
} from '@/utils/query-loader/branch.loader';
import { patterns } from '@/utils/format-string';

interface Props {
	id?: string;
}

export const BranchModal = ({ id }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const userRecoil = useRecoilValue(userState);
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			branch_name: '',
			phone: '',
			address: '',
			email: '',
			embed_map: '',
		},
		validate: {
			branch_name: isNotEmpty(t('validation.required')),
			address: isNotEmpty(t('validation.required')),
			phone: matches(patterns.phone, t('validation.phone')),
			email: isEmail(t('validation.email')),
			embed_map: isNotEmpty(t('validation.required')),
		},
	});

	const getDetail = useGetBranchById({
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

	const createBranch = useCreateBranch({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_BRANCH.SEARCH]);
				handleCancel();
			},
		},
	});

	const updateBranch = useUpdateBranch({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_BRANCH.SEARCH]);
				handleCancel();
			},
		},
	});

	const handleSubmit = (values: any) => {
		const dataPost: any = {
			...values,
		};

		if (!id) {
			// Create
			dataPost.created_by_user_id = userRecoil.user_id;
			createBranch.mutate(dataPost);
		} else {
			dataPost.lu_user_id = userRecoil.user_id;
			updateBranch.mutate(dataPost);
		}
	};

	const handleCancel = () => {
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
				size={'500'}
				title={!id ? t('branches.title_create') : t('branches.title_update')}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: createBranch.isLoading || updateBranch.isLoading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<LoadingOverlay visible={getDetail.isFetching} />
					<Grid gutter={16}>
						<Grid.Col span={12}>
							<TextInput
								size="sm"
								label={t('branches.fields.branch_name')}
								placeholder={t('branches.fields.branch_name')}
								withAsterisk
								{...form.getInputProps('branch_name')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<Textarea
								size="sm"
								label={t('branches.fields.phone')}
								placeholder={t('branches.fields.phone')}
								{...form.getInputProps('phone')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<Textarea
								size="sm"
								label={t('branches.fields.address')}
								placeholder={t('branches.fields.address')}
								{...form.getInputProps('address')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<Textarea
								size="sm"
								label={t('branches.fields.email')}
								placeholder={t('branches.fields.email')}
								{...form.getInputProps('email')}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<TextInput
								size="sm"
								label={t('branches.fields.embed_map')}
								placeholder={t('branches.fields.embed_map')}
								rightSection={
									<Anchor
										h={20}
										href={
											form.getInputProps('embed_map').value
												? form.getInputProps('embed_map').value
												: undefined
										}
										target="_blank"
										rel="noopener"
										c={form.getInputProps('embed_map').value ? '' : 'gray'}
									>
										<IconLink stroke={1.4} size={20} />
									</Anchor>
								}
								withAsterisk
								{...form.getInputProps('embed_map')}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
