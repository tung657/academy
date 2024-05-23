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

import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { featureSelectedState } from '@/store/feature/atom';
import { userState } from '@/store/user/atom';
import { convertToString } from '@/utils/array';
import {
	CACHE_ACTION,
	useCreateAction,
	useGetActionDetail,
	useUpdateAction,
} from '@/utils/query-loader/action.loader';
import { queryClient } from '@/utils/query-loader/react-query';
import { getRuleForms } from '@/utils/validation';

interface Props {
	id?: string;
}

export const ActionModal = ({ id }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const userRecoil = useRecoilValue(userState);
	const featureSelected = useRecoilValue(featureSelectedState);
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			action_code: '',
			action_name: '',
			description: '',
		},
		validate: {
			action_code: isNotEmpty(t('validation.required')),
			action_name: isNotEmpty(t('validation.required')),
		},
	});

	const getDetail = useGetActionDetail({
		id: id!,
		enabled: !!id && opened,
		config: {
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

	const createQuery = useCreateAction({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_ACTION.SEARCH]);
				handleCancel();
			},
		},
	});

	const updateQuery = useUpdateAction({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_ACTION.SEARCH]);
				handleCancel();
			},
		},
	});

	const handleSubmit = (values: any) => {
		const dataPost: any = {
			...values,
			function_id: featureSelected?.key,
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
				<Button
					disabled={!featureSelected}
					size="sm"
					leftSection={<IconPlus size={20} />}
					onClick={open}
				>
					{t('global.create')}
				</Button>
			) : (
				<Tooltip disabled={!featureSelected} label={t('global.edit')}>
					<ActionIcon radius={'md'} variant="default" c="yellow" onClick={open}>
						<IconEdit style={{ width: '80%', height: '80%' }} />
					</ActionIcon>
				</Tooltip>
			)}

			<ModalRender
				opened={opened}
				onClose={handleCancel}
				size={700}
				title={!id ? t('actions.title_create') : t('actions.title_update')}
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
								label={t('actions.fields.action_code')}
								placeholder={t('actions.fields.action_code')}
								withAsterisk
								{...form.getInputProps('action_code')}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<TextInput
								size="sm"
								label={t('actions.fields.action_name')}
								placeholder={t('actions.fields.action_name')}
								withAsterisk
								{...form.getInputProps('action_name')}
							/>
						</Grid.Col>

						<Grid.Col span={12}>
							<Textarea
								size="sm"
								label={t('actions.fields.description')}
								placeholder={t('actions.fields.description')}
								{...form.getInputProps('description')}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
