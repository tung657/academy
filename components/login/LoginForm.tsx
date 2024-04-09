'use client';

import { useTranslations } from 'next-intl';
import { TitleRender } from '../mantines/typographies/TitleRender';
import classes from './scss/login.module.scss';
import {
	Anchor,
	Box,
	Flex,
	PasswordInput,
	Stack,
	TextInput,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { getRuleForms } from '@/utils/validation';
import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { useState } from 'react';
import { getNotifications } from '../mantines/notification/getNotifications';
import { useLogin } from '@/utils/query-loader/user.loader';
import { useRouter } from '@/libs/i18n-navigation';
import { useSearchParams } from 'next/navigation';
import { DASHBOARD_URL } from '@/libs/urls';

type loginType = 'login' | 'forget';

export const LoginForm = (): JSX.Element => {
	const t = useTranslations();

	const [typeForm, setTypeForm] = useState<loginType>('login');
	const router = useRouter();
	const searchParams = useSearchParams();

	const form1 = useForm({
		...getRuleForms(),
		initialValues: {
			user_name: '',
			password: '',
		},
		validateInputOnChange: false,
		validate: {
			user_name: isNotEmpty(t('validation.required')),
			password: isNotEmpty(t('validation.required')),
		},
	});

	const form2 = useForm({
		...getRuleForms(),
		initialValues: {
			email: '',
		},
		validateInputOnChange: false,
		validate: {
			email: isEmail(t('validation.email')),
		},
	});

	const loginMutate = useLogin({
		config: {
			onSuccess: async (data) => {
				if (!data.success) {
					getNotifications('error', t, data.message);
					return;
				}
				const redirectParam = searchParams.get('redirect');
				await getNotifications('success', t, data.message);

				console.log(redirectParam);
				router.push(redirectParam || DASHBOARD_URL);
				router.refresh();
			},
			onError: (error) => {
				getNotifications('error', t, error.response?.data.message);
			},
		},
	});

	const handleSubmit = (values: Record<string, unknown>) => {
		// getNotifications('success', t);
		loginMutate.mutate(values as any);
	};

	return (
		<section className={classes.section}>
			<div className={classes.background}>
				<div className={classes.shape}></div>
				<div className={classes.shape}></div>
			</div>
			{typeForm === 'login' ? (
				<Box component="form" onSubmit={form1.onSubmit(handleSubmit)}>
					<TitleRender order={3} mb={16} fw={'bold'} tt={'uppercase'}>
						{t('login.heading_login')}
					</TitleRender>

					<Stack>
						<TextInput
							label={t('login.username')}
							placeholder={t('login.username')}
							size="md"
							withAsterisk
							spellCheck={false}
							{...form1.getInputProps('user_name')}
						/>
						<PasswordInput
							size="md"
							withAsterisk
							label={t('login.password')}
							placeholder={t('login.password')}
							{...form1.getInputProps('password')}
						/>

						<Flex justify={'flex-end'}>
							<Anchor c={'blue'} onClick={() => setTypeForm('forget')}>
								{t('login.forget_password')}
							</Anchor>
						</Flex>

						<ButtonBubble type="submit">{t('login.username')}</ButtonBubble>
					</Stack>
				</Box>
			) : (
				<Box component="form" onSubmit={form2.onSubmit(handleSubmit)}>
					<TitleRender order={3} mb={16} fw={'bold'} tt={'uppercase'}>
						{t('login.heading_forget')}
					</TitleRender>
					<Stack>
						<TextInput
							label={t('login.email')}
							placeholder={t('login.email')}
							size="md"
							withAsterisk
							spellCheck={false}
							{...form2.getInputProps('email')}
						/>

						<Flex justify={'flex-end'}>
							<Anchor c={'blue'} onClick={() => setTypeForm('login')}>
								{t('login.heading_login')}
							</Anchor>
						</Flex>

						<ButtonBubble type="submit">
							{t('global.btn_send_message')}
						</ButtonBubble>
					</Stack>
				</Box>
			)}
		</section>
	);
};
