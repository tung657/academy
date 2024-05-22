'use client';

import {
	Anchor,
	Box,
	Flex,
	PasswordInput,
	Stack,
	TextInput,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

import { DASHBOARD_URL } from '@/libs/urls';
import { ERROR_TIMEOUT, ORIGIN_URL } from '@/utils/config';
import { useSendResetPassword } from '@/utils/query-loader/email.loader';
import { useLogin } from '@/utils/query-loader/user.loader';
import { getRuleForms } from '@/utils/validation';

import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { getNotifications } from '../mantines/notification/getNotifications';
import { TitleRender } from '../mantines/typographies/TitleRender';
import classes from './scss/login.module.scss';

type loginType = 'login' | 'forget';

export const LoginForm = (): JSX.Element => {
	const t = useTranslations();

	const [typeForm, setTypeForm] = useState<loginType>('login');
	const searchParams = useSearchParams();

	const form = useForm({
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

	const loginMutate = useLogin({
		config: {
			onSuccess: async (data, variables) => {
				if (data.message === ERROR_TIMEOUT) {
					loginMutate.mutate(variables);
					return;
				}
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				const redirectParam = searchParams.get('redirect');
				getNotifications('success', t, data.message);

				// router.refresh();
				// router.push(redirectParam || DASHBOARD_URL);
				window.open(redirectParam || DASHBOARD_URL, '_parent');
			},
			onError: (error) => {
				const message = error.response?.data.message || error.message;
				getNotifications('error', t, message);
			},
		},
	});

	const handleSubmit = (values: Record<string, unknown>) => {
		loginMutate.mutate(values as any);
	};

	return (
		<section className={classes.section}>
			<div className={classes.background}>
				<div className={classes.shape}></div>
				<div className={classes.shape}></div>
			</div>
			{typeForm === 'login' ? (
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<TitleRender order={3} mb={16} fw={'bold'} tt={'uppercase'}>
						{t('login.heading_login')}
					</TitleRender>

					<Stack>
						<TextInput
							label={t('login.username')}
							placeholder={t('login.username')}
							size="md"
							withAsterisk
							autoComplete="on"
							spellCheck={false}
							{...form.getInputProps('user_name')}
						/>
						<PasswordInput
							size="md"
							withAsterisk
							label={t('login.password')}
							placeholder={t('login.password')}
							{...form.getInputProps('password')}
						/>

						<Flex justify={'flex-end'}>
							<Anchor c={'blue'} onClick={() => setTypeForm('forget')}>
								{t('login.forget_password')}
							</Anchor>
						</Flex>

						<ButtonBubble type="submit" loading={loginMutate.isLoading}>
							{t('login.username')}
						</ButtonBubble>
					</Stack>
				</Box>
			) : (
				<ResetPwd setTypeForm={setTypeForm} />
			)}
		</section>
	);
};

function ResetPwd({
	setTypeForm,
}: {
	setTypeForm: Dispatch<SetStateAction<loginType>>;
}): JSX.Element {
	const t = useTranslations();
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			email: '',
		},
		validateInputOnChange: false,
		validate: {
			email: isEmail(t('validation.email')),
		},
	});

	const emailQuery = useSendResetPassword({
		config: {
			onSuccess: (data) => {
				if (!data.success) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
			},
			onError: (error) => {
				const message = error.response?.data.message || error.message;
				getNotifications('error', t, message);
			},
		},
	});

	const handleSubmit = (values: any) => {
		const dataPost = {
			...values,
			url: ORIGIN_URL,
		};

		emailQuery.mutate(dataPost);
	};

	return (
		<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
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
					{...form.getInputProps('email')}
				/>

				<Flex justify={'flex-end'}>
					<Anchor c={'blue'} onClick={() => setTypeForm('login')}>
						{t('login.heading_login')}
					</Anchor>
				</Flex>

				<ButtonBubble type="submit" loading={emailQuery.isLoading}>
					{t('global.btn_send_message')}
				</ButtonBubble>
			</Stack>
		</Box>
	);
}
