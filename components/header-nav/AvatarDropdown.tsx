import { useRouter } from '@/libs/i18n-navigation';
import { LOGIN_URL } from '@/libs/urls';
import { LOCAL_TOKEN, LOCAL_USER } from '@/utils/config';
import {
	ActionIcon,
	Avatar,
	Box,
	Flex,
	Grid,
	Group,
	Menu,
	Text,
	TextInput,
	Textarea,
	Tooltip,
	UnstyledButton,
	rem,
} from '@mantine/core';
import {
	IconChevronRight,
	IconKey,
	IconMoodHeart,
	IconPower,
	IconRefresh,
	IconUpload,
	IconUserEdit,
} from '@tabler/icons-react';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { getNotifications } from '../mantines/notification/getNotifications';
import { useTranslations } from 'next-intl';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@/store/user/atom';
import { ModalRender } from '../mantines/modal/ModalRender';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import logo from '@/assets/images/logos/logo.jpg';
import classes from './scss/avatar-dropdown.module.scss';
import { useUpdateEmployee } from '@/utils/query-loader/user.loader';
import { SelectRender } from '../mantines/inputs/SelectRender';
import { genderOptions } from '@/libs/dropdown';
import { DateInput } from '@mantine/dates';
import {
	dateParser,
	formatDatePost,
	formatDateShow,
} from '@/utils/format-string';
import dayjs from 'dayjs';
import { IUserStorage } from '@/types';
import { uploadFile } from '@/utils/services/file.service';

export const AvatarDropdown = (): JSX.Element => {
	const router = useRouter();
	const t = useTranslations();
	const userRecoil = useRecoilValue(userState);
	const [openedProfile, setOpenProfile] = useState(false);
	const [openedPassword, setOpenPassword] = useState(false);

	const handleLogout = () => {
		getNotifications('success', t, t('messages.logout_success'));
		deleteCookie(LOCAL_TOKEN);
		deleteCookie(LOCAL_USER);
		setTimeout(() => {
			router.push(LOGIN_URL);
			router.refresh();
		}, 500);
	};

	return (
		<>
			<Menu
				shadow="lg"
				width={200}
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
	const [files, setFiles] = useState<FileWithPath[]>();
	const [loading, setLoading] = useState(false);
	const form = useForm({
		initialValues: {
			full_name: userRecoil.full_name,
			phone_number: userRecoil.phone_number,
			gender: userRecoil.gender?.toString(),
			email: userRecoil.email,
			date_of_birth: dateParser?.(userRecoil.date_of_birth),
			address: userRecoil.address,
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
				const dataUser = JSON.parse(getCookie(LOCAL_USER) || '{}');
				setCookie(LOCAL_USER, JSON.stringify({ ...dataUser, ...variables }));
				handleCancel();
			},
		},
	});

	const handleSubmit = async (values: any) => {
		setLoading(true);
		const { position_id, user_name } = userRecoil;
		const dataPost = {
			...values,
			position_id,
			employee_id: user_name,
			date_of_birth: dayjs(values.date_of_birth).format(formatDatePost),
		};

		if (files) {
			const formData = new FormData();
			formData.append('file', files[0]);
			const dataUpload = await uploadFile(formData);
			if (dataUpload.url) dataPost.avatar = dataUpload.url;
		}

		await updateQuery.mutateAsync(dataPost);

		setLoading(false);
	};

	const handleCancel = () => {
		form.reset();
		updateQuery.reset();
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
					okText: t('global.btn_confirm'),
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
							<div className={classes.dropzoneWrap}>
								<Tooltip label="Upload">
									<Dropzone
										h={'100%'}
										w={'100%'}
										radius={'50%'}
										accept={IMAGE_MIME_TYPE}
										maxSize={1 * 1024 ** 2}
										style={{
											backgroundImage: `url(${
												files
													? URL.createObjectURL(files[0])
													: userRecoil.avatar
														? userRecoil.avatar
														: logo.src
											})`,
											backgroundSize: 'contain',
											backgroundRepeat: 'no-repeat',
											backgroundPosition: 'center center',
										}}
										multiple={false}
										onReject={(fileReject) => {
											console.log(fileReject);
											getNotifications('error', t, 'File không thể quá 1MB');
										}}
										onDrop={setFiles}
									></Dropzone>
								</Tooltip>
								<Flex
									className={classes.dropzoneAction}
									p={8}
									w={'100%'}
									justify={'center'}
									align={'center'}
									gap={8}
									fw={700}
									c={'white'}
								>
									<IconUpload />
								</Flex>
							</div>
							<Text fz="sm" py={8}>
								File {'<'} 1MB
							</Text>
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
						<Grid.Col span={12}>
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
				onClose={() => setOpened(false)}
				title={t('login.change_password')}
			></ModalRender>
		</>
	);
}
