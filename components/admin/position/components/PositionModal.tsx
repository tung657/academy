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
import { userState } from '@/store/user/atom';
import { convertToString } from '@/utils/array';
import {
	useCreatePosition,
	useUpdatePosition,
} from '@/utils/query-loader/position.loader';
import {
	CACHE_POSITION,
	useGetPositionById,
} from '@/utils/query-loader/position.loader';
import { queryClient } from '@/utils/query-loader/react-query';
import { getRuleForms } from '@/utils/validation';

interface Props {
	id?: number;
}

export const PositionModal = ({ id }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const userRecoil = useRecoilValue(userState);
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			position_name: '',
			description: '',
		},
		validate: {
			position_name: isNotEmpty(t('validation.required')),
		},
	});
	const getDetail = useGetPositionById({
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

	const createPosition = useCreatePosition({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_POSITION.SEARCH]);
				handleCancel();
			},
		},
	});

	const updatePosition = useUpdatePosition({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_POSITION.SEARCH]);
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
			createPosition.mutate(dataPost);
		} else {
			dataPost.lu_user_id = userRecoil.user_id;
			updatePosition.mutate(dataPost);
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
				title={!id ? t('positions.title_create') : t('positions.title_update')}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: createPosition.isLoading || updatePosition.isLoading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<LoadingOverlay visible={getDetail.isFetching} />
					<Grid gutter={16}>
						<Grid.Col span={12}>
							<TextInput
								size="sm"
								label={t('positions.fields.position')}
								placeholder={t('positions.fields.position')}
								withAsterisk
								{...form.getInputProps('position_name')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<Textarea
								size="sm"
								label={t('positions.fields.description')}
								placeholder={t('positions.fields.description')}
								{...form.getInputProps('description')}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
