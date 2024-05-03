import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { userState } from '@/store/user/atom';
import { convertToString } from '@/utils/array';
import { queryClient } from '@/utils/query-loader/react-query';
import { getRuleForms } from '@/utils/validation';
import {
	ActionIcon,
	Box,
	Button,
	Grid,
	LoadingOverlay,
	TextInput,
	Textarea,
	Tooltip,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';
import {
	CACHE_ROLE,
	useCreateRole,
	useGetRoleById,
	useUpdateRole,
} from '@/utils/query-loader/role.loader';

interface Props {
	id?: string;
}

export const RoleModal = ({ id }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const userRecoil = useRecoilValue(userState);
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			role_code: '',
			role_name: '',
			description: '',
		},
		validate: {
			role_code: isNotEmpty(t('validation.required')),
			role_name: isNotEmpty(t('validation.required')),
		},
	});

	const getDetail = useGetRoleById({
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

	const createQuery = useCreateRole({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_ROLE.SEARCH]);
				handleCancel();
			},
		},
	});

	const updateQuery = useUpdateRole({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_ROLE.SEARCH]);
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
			createQuery.mutate(dataPost);
		} else {
			dataPost.lu_user_id = userRecoil.user_id;
			updateQuery.mutate(dataPost);
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
				size={700}
				title={!id ? t('roles.title_create') : t('roles.title_update')}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: createQuery.isLoading || updateQuery.isLoading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<LoadingOverlay visible={getDetail.isFetching} />
					<Grid gutter={16}>
						<Grid.Col span={6}>
							<TextInput
								size="sm"
								disabled={!!id}
								label={t('roles.fields.role_code')}
								placeholder={t('roles.fields.role_code')}
								withAsterisk
								{...form.getInputProps('role_code')}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<TextInput
								size="sm"
								label={t('roles.fields.role_name')}
								placeholder={t('roles.fields.role_name')}
								withAsterisk
								{...form.getInputProps('role_name')}
							/>
						</Grid.Col>

						<Grid.Col span={12}>
							<Textarea
								size="sm"
								label={t('roles.fields.description')}
								placeholder={t('roles.fields.description')}
								{...form.getInputProps('description')}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
