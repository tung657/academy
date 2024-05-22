'use client';

import { Box, Card, Container, Grid, Image, Stack } from '@mantine/core';
import { isEmail, isNotEmpty, matches, useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';

import { imgContacts } from '@/assets/images/contact';
import { userState } from '@/store/user/atom';
import { patterns } from '@/utils/format-string';
import { useCreateContact } from '@/utils/query-loader/contact.loader';
import { getRuleForms } from '@/utils/validation';

import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { InputFloat } from '../mantines/inputs/InputFloat';
import { TextAreaFloat } from '../mantines/inputs/TextAreaFloat';
import { getNotifications } from '../mantines/notification/getNotifications';
import { TitleCombo } from '../mantines/typographies/TitleCombo';

export const ContactForm = (): JSX.Element => {
	const t = useTranslations();
	const userRecoil = useRecoilValue(userState);
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			customer_name: '',
			email: '',
			phone_number: '',
			message: '',
		},
		validate: {
			customer_name: isNotEmpty(t('validation.required')),
			email: isEmail(t('validation.email')),
			phone_number: matches(patterns.phone, t('validation.phone')),
			message: isNotEmpty(t('validation.required')),
		},
	});
	const createContact = useCreateContact({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
			},
		},
	});
	const handleSubmit = (values: Record<string, unknown>) => {
		// TODO: send message
		const dataPost: any = {
			...values,
		};
		console.log(values);
		dataPost.created_by_user_id = userRecoil.user_id;
		createContact.mutate(dataPost);
	};

	return (
		<section>
			<Container size="xl">
				<TitleCombo
					titleSub="GET IN TOUCH"
					titleChildren="Ready to Get Started?"
					description="Your email address will not be published. Required fields are marked *"
				/>
				<Grid gutter={16} my={32}>
					<Grid.Col span={{ base: 12, md: 6 }}>
						<Image
							src={imgContacts.contact}
							width={750}
							height={620}
							w={'100%'}
							h={'auto'}
							loading="lazy"
							alt="contact"
						/>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 6 }}>
						<Card shadow="sm" py={32}>
							<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
								<Stack gap={32}>
									<InputFloat
										label={t('validation.fields.name')}
										placeholder={t('validation.fields.name')}
										{...form.getInputProps('customer_name')}
									/>
									<InputFloat
										label={t('validation.fields.email')}
										placeholder={t('validation.fields.email')}
										{...form.getInputProps('email')}
									/>
									<InputFloat
										label={t('validation.fields.phone')}
										placeholder={t('validation.fields.phone')}
										{...form.getInputProps('phone_number')}
									/>
									<TextAreaFloat
										label={t('validation.fields.message')}
										placeholder={t('validation.fields.message')}
										{...form.getInputProps('message')}
									/>

									<ButtonBubble
										size="lg"
										fullWidth={false}
										leftSection={<IconCheck />}
										type="submit"
										loading={createContact.isLoading}
									>
										{t('global.btn_send_message')}
									</ButtonBubble>
								</Stack>
							</Box>
						</Card>
					</Grid.Col>
				</Grid>
			</Container>
		</section>
	);
};
