import { Box, Grid, TextInput, Textarea } from '@mantine/core';
import { isEmail, matches, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';

import { userState } from '@/store/user/atom';
import { ICourse } from '@/types/course';
import { ICourseRegister } from '@/types/course-register';
import { patterns } from '@/utils/format-string';
import { useCreateCourseRegister } from '@/utils/query-loader/course-register.loader';
import { getRuleForms } from '@/utils/validation';

import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { ModalRender } from '../mantines/modal/ModalRender';
import { getNotifications } from '../mantines/notification/getNotifications';

interface Props {
	data?: ICourse;
}

export const CourseRegisterForm = ({ data }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const userRecoil = useRecoilValue(userState);

	const form = useForm({
		...getRuleForms(),
		initialValues: {
			full_name: '',
			phone_number: '',
			email: '',
			note: '',
			course_id: data?.course_id,
			course_name: data?.course_name,
		},
		validate: {
			full_name: (value) => patterns.name(value, t),
			phone_number: matches(patterns.phone, t('validation.required')),
			email: isEmail(t('validation.required')),
		},
	});

	const createQuery = useCreateCourseRegister({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				handleCancel();
			},
		},
	});

	const handleSubmit = (values: any) => {
		const dataPost: ICourseRegister = {
			...values,
			created_by_user_id: userRecoil.user_id,
		};

		createQuery.mutate(dataPost);
	};

	const handleCancel = () => {
		form.reset();
		close();
	};

	return (
		<>
			<ButtonBubble onClick={open}>{t('global.register')}</ButtonBubble>

			<ModalRender
				opened={opened}
				onClose={handleCancel}
				title={t('courses.title_register') + ' ' + data?.course_name}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: createQuery.isLoading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<Grid gutter={16}>
						<Grid.Col span={12}>
							<TextInput
								label={t('validation.fields.name')}
								placeholder={t('validation.fields.name')}
								withAsterisk
								{...form.getInputProps('full_name')}
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 6 }}>
							<TextInput
								label={t('validation.fields.phone')}
								placeholder={t('validation.fields.phone')}
								withAsterisk
								{...form.getInputProps('phone_number')}
							/>
						</Grid.Col>

						<Grid.Col span={{ base: 12, md: 6 }}>
							<TextInput
								label={t('validation.fields.email')}
								placeholder={t('validation.fields.email')}
								withAsterisk
								type="email"
								{...form.getInputProps('email')}
							/>
						</Grid.Col>

						<Grid.Col span={12}>
							<Textarea
								label={t('validation.fields.note')}
								placeholder={t('validation.fields.note')}
								rows={5}
								{...form.getInputProps('note')}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
