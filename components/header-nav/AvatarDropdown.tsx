import {
	Avatar,
	Box,
	Flex,
	Grid,
	Group,
	Menu,
	PasswordInput,
	Text,
	TextInput,
	Textarea,
	UnstyledButton,
	rem,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { FileWithPath } from '@mantine/dropzone';
import { isEmail, isNotEmpty, matches, useForm } from '@mantine/form';
import {
	IconChevronRight,
	IconKey,
	IconMoodHeart,
	IconPower,
	IconUserEdit,
} from '@tabler/icons-react';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import logo from '@/assets/images/logos/logo.png';
import { genderOptions } from '@/libs/dropdown';
import { LOGIN_URL } from '@/libs/urls';
import { userState } from '@/store/user/atom';
import { IUserStorage } from '@/types';
import { LOCAL_TOKEN, LOCAL_USER } from '@/utils/config';
import {
	dateParser,
	formatDatePost,
	formatDateShow,
	patterns,
	removeVietnameseTones,
} from '@/utils/format-string';
import {
	useChangePasswordEmployee,
	useUpdateEmployee,
} from '@/utils/query-loader/user.loader';
import { deleteFile, uploadFile } from '@/utils/services/file.service';
import { getRuleForms } from '@/utils/validation';

import { SelectRender } from '../mantines/inputs/SelectRender';
import { ModalRender } from '../mantines/modal/ModalRender';
import { getNotifications } from '../mantines/notification/getNotifications';
import { DropzoneRender } from '../shared/dropzone/DropzoneRender';

export const AvatarDropdown = (): JSX.Element => {
	const t = useTranslations();
	const userRecoil = useRecoilValue(userState);
	const [openedProfile, setOpenProfile] = useState(false);
	const [openedPassword, setOpenPassword] = useState(false);

	const handleLogout = () => {
		getNotifications('success', t, t('messages.logout_success'));
		deleteCookie(LOCAL_TOKEN);
		deleteCookie(LOCAL_USER);
		setTimeout(() => {
			window && window.open(LOGIN_URL + '?q=true', '_parent');
		}, 500);
	};

	return (
		<>
			<Menu
				shadow="lg"
				width={200}
				trapFocus={false}
				transitionProps={{ transition: 'fade-down' }}
				trigger="click"
				position="bottom-end"
				closeOnItemClick={false}
				closeOnClickOutside={!openedProfile && !openedPassword}
			>
				<Menu.Target>
					<UnstyledButton>
						<Group gap={6}>
							<Avatar
								src={userRecoil.avatar || null}
								alt={userRecoil.full_name}
							/>
							<div style={{ flex: 1 }}>
								<Text fz="sm" fw={500}>
									{userRecoil.full_name}
								</Text>

								<Text c="dimmed" fz="xs">
									{userRecoil.position_name}
								</Text>
							</div>

							<IconChevronRight
								style={{ width: rem(14), height: rem(14) }}
								stroke={1.5}
							/>
						</Group>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Label tt="uppercase" ta="center" fw={600}>
						<Flex justify={'center'} align={'center'} gap={4}>
							{userRecoil.full_name}{' '}
							<Group c="red">
								<IconMoodHeart stroke={1.5} size={20} />
							</Group>
						</Flex>
					</Menu.Label>
					<ProfileModal opened={openedProfile} setOpened={setOpenProfile} />
					<ChangePasswordModal
						opened={openedPassword}
						setOpened={setOpenPassword}
					/>
					<Menu.Divider />
					<Menu.Item
						color="red"
						leftSection={<IconPower stroke={1.5} size={20} />}
						onClick={handleLogout}
					>
						{t('login.logout')}
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</>
	);
};

function ProfileModal({ opened, setOpened }: any): JSX.Element {
	const t = useTranslations();
	const [userRecoil, setUserRecoil] = useRecoilState(userState);
	const [pathNeedDelete, setPathNeedDelete] = useState<string>();
	const [files, setFiles] = useState<FileWithPath[]>();
	const [loading, setLoading] = useState(false);
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			full_name: userRecoil.full_name,
			phone_number: userRecoil.phone_number,
			gender: userRecoil.gender?.toString(),
			email: userRecoil.email,
			date_of_birth: dateParser?.(userRecoil.date_of_birth),
			address: userRecoil.address,
		},
		validate: {
			full_name: isNotEmpty(t('validation.required')),
			phone_number: matches(patterns.phone, t('validation.phone')),
			gender: isNotEmpty(t('validation.required')),
			email: isEmail(t('validation.email')),
			date_of_birth: isNotEmpty(t('validation.required')),
		},
	});

	useEffect(() => {
		const { full_name, phone_number, gender, email, date_of_birth, address } =
			userRecoil;
		form.setValues({
			full_name,
			phone_number,
			gender: gender?.toString(),
			email,
			date_of_birth: dateParser?.(date_of_birth),
			address,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userRecoil]);

	const updateQuery = useUpdateEmployee({
		config: {
			onSuccess: (data, variables) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}

				getNotifications('success', t, data.message);
				setUserRecoil((prev) => ({ ...prev, ...variables }) as IUserStorage);
				deleteCookie(LOCAL_USER);
				const dataUser = JSON.parse(getCookie(LOCAL_USER) || '{}');
				setCookie(LOCAL_USER, JSON.stringify({ ...dataUser, ...variables }), {
					path: '/admin/',
					maxAge: 86400, // 24 hours
					sameSite: 'strict',
				});
				pathNeedDelete && deleteFile(pathNeedDelete);
				handleCancel();
			},
		},
	});

	const handleSubmit = async (values: any) => {
		setLoading(true);
		const { position_id, user_name, user_id, avatar } = userRecoil;
		const dataPost = {
			...values,
			avatar,
			user_id,
			position_id,
			employee_id: user_name,
			date_of_birth: dayjs(values.date_of_birth).format(formatDatePost),
		};

		if (files) {
			const formData = new FormData();
			formData.append('file', files[0], removeVietnameseTones(files[0].name));
			const dataUpload = await uploadFile(formData);
			dataPost.avatar && setPathNeedDelete(dataPost.avatar);
			if (dataUpload.url) dataPost.avatar = dataUpload.url;
		}

		await updateQuery.mutateAsync(dataPost);

		setLoading(false);
	};

	const handleCancel = () => {
		form.reset();
		updateQuery.reset();
		setPathNeedDelete(undefined);
		setLoading(false);
		setFiles(undefined);
		setOpened(false);
	};

	return (
		<>
			<Menu.Item
				leftSection={<IconUserEdit stroke={1.5} size={20} />}
				onClick={() => setOpened(true)}
			>
				{t('login.profile')}
			</Menu.Item>

			<ModalRender
				opened={opened}
				size={900}
				onClose={handleCancel}
				title={t('login.profile')}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: loading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<Grid>
						<Grid.Col
							span={4}
							display={'flex'}
							style={{
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Box ta={'center'} w={180} h={180}>
								<DropzoneRender
									fileUrl={
										files
											? URL.createObjectURL(files[0])
											: userRecoil.avatar
												? userRecoil.avatar
												: logo.src
									}
									onDrops={setFiles}
									limit={1}
									label={t('profile.fields.avatar')}
									radius={'50%'}
								/>
							</Box>
						</Grid.Col>
						<Grid.Col span={8}>
							<Grid gutter={16}>
								<Grid.Col span={6}>
									<TextInput
										label={t('profile.fields.full_name')}
										placeholder={t('profile.fields.full_name')}
										withAsterisk
										{...form.getInputProps('full_name')}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<TextInput
										label={t('profile.fields.email')}
										placeholder={t('profile.fields.email')}
										withAsterisk
										{...form.getInputProps('email')}
									/>
								</Grid.Col>

								<Grid.Col span={4}>
									<TextInput
										label={t('profile.fields.phone_number')}
										placeholder={t('profile.fields.phone_number')}
										withAsterisk
										{...form.getInputProps('phone_number')}
									/>
								</Grid.Col>
								<Grid.Col span={4}>
									<SelectRender
										data={genderOptions}
										label={t('profile.fields.gender')}
										placeholder={t('profile.fields.gender')}
										withAsterisk
										{...form.getInputProps('gender')}
									/>
								</Grid.Col>
								<Grid.Col span={4}>
									<DateInput
										size="sm"
										valueFormat={formatDateShow}
										label={t('profile.fields.date_of_birth')}
										placeholder={t('profile.fields.date_of_birth')}
										dateParser={dateParser}
										maxDate={new Date()}
										withAsterisk
										{...form.getInputProps('date_of_birth')}
									/>
								</Grid.Col>
							</Grid>
						</Grid.Col>
						<Grid.Col span={12} mt={42}>
							<Textarea
								label={t('profile.fields.address')}
								placeholder={t('profile.fields.address')}
								{...form.getInputProps('address')}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
}

function ChangePasswordModal({ opened, setOpened }: any): JSX.Element {
	const t = useTranslations();
	const userRecoil = useRecoilValue(userState);
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			old_password: '',
			new_password: '',
			confirm_password: '',
		},
		validate: {
			old_password: isNotEmpty(t('validation.required')),
			new_password: matches(patterns.password, t('validation.password')),
			confirm_password: (value, values) =>
				value !== values.new_password ? t('validation.password_confirm') : null,
		},
	});

	const handleLogout = () => {
		getNotifications(
			'success',
			t,
			'Đổi mật khẩu thành công! Vui lòng đăng nhập lại',
		);
		deleteCookie(LOCAL_TOKEN);
		deleteCookie(LOCAL_USER);
		window && window.open(LOGIN_URL, '_parent');
	};

	const updateQuery = useChangePasswordEmployee({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}

				// getNotifications('success', t, data.message);
				handleCancel();
				handleLogout();
			},
		},
	});

	const handleCancel = () => {
		form.reset();
		updateQuery.reset();
		setOpened(false);
	};

	const handleSubmit = (values: any) => {
		updateQuery.mutate({
			...values,
			user_id: userRecoil.user_id,
			lu_user_id: userRecoil.user_id,
		});
	};

	return (
		<>
			<Menu.Item
				leftSection={<IconKey stroke={1.5} size={20} />}
				onClick={() => setOpened(true)}
			>
				{t('login.change_password')}
			</Menu.Item>

			<ModalRender
				opened={opened}
				onClose={handleCancel}
				title={t('login.change_password')}
				size={500}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: updateQuery.isLoading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<Grid gutter={16}>
						<Grid.Col>
							<PasswordInput
								label={t('profile.fields.old_password')}
								placeholder={t('profile.fields.old_password')}
								withAsterisk
								{...form.getInputProps('old_password')}
							/>
						</Grid.Col>
						<Grid.Col>
							<PasswordInput
								label={t('profile.fields.new_password')}
								placeholder={t('profile.fields.new_password')}
								withAsterisk
								{...form.getInputProps('new_password')}
							/>
						</Grid.Col>
						<Grid.Col>
							<PasswordInput
								label={t('profile.fields.confirm_password')}
								placeholder={t('profile.fields.confirm_password')}
								withAsterisk
								{...form.getInputProps('confirm_password')}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
}
