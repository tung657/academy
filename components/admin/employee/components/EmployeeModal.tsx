import { SelectRender } from '@/components/mantines/inputs/SelectRender';
import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { genderOptions } from '@/libs/dropdown';
import { userState } from '@/store/user/atom';
import { convertToString } from '@/utils/array';
import {
	dateParser,
	formatDatePost,
	formatDateShow,
	patterns,
} from '@/utils/format-string';
import { useGetBranchDropdown } from '@/utils/query-loader/branch.loader';
import { useGetPositionDropdown } from '@/utils/query-loader/position.loader';
import { queryClient } from '@/utils/query-loader/react-query';
import { useGetRoleDropdown } from '@/utils/query-loader/role.loader';
import {
	CACHE_EMPLOYEES,
	useCreateEmployee,
	useGetEmployeeById,
	useUpdateEmployee,
} from '@/utils/query-loader/user.loader';
import { getRuleForms } from '@/utils/validation';
import {
	ActionIcon,
	Box,
	Button,
	Grid,
	Loader,
	LoadingOverlay,
	TextInput,
	Textarea,
	Tooltip,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { isEmail, isNotEmpty, matches, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';

interface Props {
	id?: string;
}

export const EmployeeModal = ({ id }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const userProfile = useRecoilValue(userState);
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			employee_id: '',
			full_name: '',
			phone_number: '',
			gender: '1',
			date_of_birth: dateParser?.('1999-01-01'),
			email: '',
			branch_id: '',
			position_id: '',
			role_id: '',
			address: '',
		},
		validate: {
			employee_id: matches(patterns.username, t('validation.username')),
			full_name: isNotEmpty(t('validation.required')),
			phone_number: matches(patterns.phone, t('validation.phone')),
			gender: isNotEmpty(t('validation.required')),
			date_of_birth: isNotEmpty(t('validation.required')),
			email: isEmail(t('validation.email')),
			branch_id: isNotEmpty(t('validation.required')),
			position_id: isNotEmpty(t('validation.required')),
			role_id: isNotEmpty(t('validation.required')),
		},
	});

	const {
		data: branchOptions,
		isFetching: loadingBranch,
		isSuccess: successBranch,
	} = useGetBranchDropdown({
		config: {
			enabled: opened,
		},
	});
	const {
		data: positionOptions,
		isFetching: loadingPosition,
		isSuccess: successPosition,
	} = useGetPositionDropdown({
		config: {
			enabled: opened && successBranch,
			keepPreviousData: true,
		},
	});
	const { data: roleOptions, isFetching: loadingRole } = useGetRoleDropdown({
		config: {
			enabled: opened && successPosition,
		},
	});

	const getDetail = useGetEmployeeById({
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
					date_of_birth: dateParser?.(data.date_of_birth),
				});
			},
		},
	});

	const createEmployee = useCreateEmployee({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_EMPLOYEES.SEARCH]);
				handleCancel();
			},
		},
	});

	const updateEmployee = useUpdateEmployee({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				queryClient.invalidateQueries([CACHE_EMPLOYEES.SEARCH]);
				handleCancel();
			},
		},
	});

	const handleSubmit = (values: any) => {
		const dataPost: any = {
			...values,
			date_of_birth: dayjs(values?.date_of_birth).format(formatDatePost),
		};

		if (!id) {
			// Create
			dataPost.created_by_user_id = userProfile.user_id;
			createEmployee.mutate(dataPost);
		} else {
			dataPost.lu_user_id = userProfile.user_id;
			updateEmployee.mutate(dataPost);
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
				size={'70%'}
				title={!id ? t('employees.title_create') : t('employees.title_update')}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: createEmployee.isLoading || updateEmployee.isLoading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<LoadingOverlay visible={getDetail.isFetching} />
					<Grid gutter={16}>
						<Grid.Col span={4}>
							<TextInput
								size="sm"
								disabled={!!id}
								label={t('employees.fields.employee_id')}
								placeholder={t('employees.fields.employee_id')}
								withAsterisk
								{...form.getInputProps('employee_id')}
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<TextInput
								size="sm"
								label={t('employees.fields.full_name')}
								placeholder={t('employees.fields.full_name')}
								withAsterisk
								{...form.getInputProps('full_name')}
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<TextInput
								size="sm"
								label={t('employees.fields.phone_number')}
								placeholder={t('employees.fields.phone_number')}
								withAsterisk
								{...form.getInputProps('phone_number')}
							/>
						</Grid.Col>

						<Grid.Col span={4}>
							<SelectRender
								size="sm"
								label={t('employees.fields.gender')}
								placeholder={t('employees.fields.gender')}
								withAsterisk
								data={genderOptions}
								{...form.getInputProps('gender')}
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<DateInput
								size="sm"
								valueFormat={formatDateShow}
								label={t('employees.fields.birth')}
								placeholder={t('employees.fields.birth')}
								dateParser={dateParser}
								maxDate={new Date()}
								withAsterisk
								{...form.getInputProps('date_of_birth')}
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<TextInput
								size="sm"
								label={t('employees.fields.email')}
								placeholder={t('employees.fields.email')}
								withAsterisk
								{...form.getInputProps('email')}
							/>
						</Grid.Col>

						<Grid.Col span={4}>
							<SelectRender
								size="sm"
								label={t('employees.fields.branch')}
								placeholder={t('employees.fields.branch')}
								withAsterisk
								data={
									branchOptions && branchOptions?.length > 0
										? branchOptions
										: []
								}
								rightSection={loadingBranch ? <Loader size={'sm'} /> : null}
								disabled={loadingBranch ? true : false}
								{...form.getInputProps('branch_id')}
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<SelectRender
								size="sm"
								label={t('employees.fields.position')}
								placeholder={t('employees.fields.position')}
								withAsterisk
								data={
									positionOptions && positionOptions?.length > 0
										? positionOptions
										: []
								}
								rightSection={loadingPosition ? <Loader size={'sm'} /> : null}
								disabled={loadingPosition ? true : false}
								{...form.getInputProps('position_id')}
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<SelectRender
								size="sm"
								label={t('employees.fields.role')}
								placeholder={t('employees.fields.role')}
								withAsterisk
								data={roleOptions && roleOptions?.length > 0 ? roleOptions : []}
								rightSection={loadingRole ? <Loader size={'sm'} /> : null}
								disabled={loadingRole ? true : false}
								{...form.getInputProps('role_id')}
							/>
						</Grid.Col>

						<Grid.Col span={12}>
							<Textarea
								size="sm"
								label={t('employees.fields.address')}
								placeholder={t('employees.fields.address')}
								{...form.getInputProps('address')}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
