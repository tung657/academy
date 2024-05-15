'use client';

import { getRuleForms } from '@/utils/validation';
import { Box, Card, Container, Grid, Image, Stack } from '@mantine/core';
import { isEmail, isNotEmpty, matches, useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { TitleCombo } from '../mantines/typographies/TitleCombo';
import { InputFloat } from '../mantines/inputs/InputFloat';
import { TextAreaFloat } from '../mantines/inputs/TextAreaFloat';
import { imgContacts } from '@/assets/images/contact';
import { ButtonBubble } from '../mantines/buttons/ButtonBubble';
import { IconCheck } from '@tabler/icons-react';
import { patterns } from '@/utils/format-string';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user/atom';
import { useCreateContact } from '@/utils/query-loader/contact.loader';
import { getNotifications } from '../mantines/notification/getNotifications';

export const ContactForm = (): JSX.Element => {
	const t = useTranslations();
	const userRecoil = useRecoilValue(userState);
	const form = useForm({
		...getRuleForms(),
		initialValues: {
			full_name: '',
			email: '',
			phone: '',
			message: '',
		},
		validate: {
			full_name: isNotEmpty(t('validation.required')),
			email: isEmail(t('validation.email')),
			phone: matches(patterns.phone, t('validation.phone')),
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
										{...form.getInputProps('full_name')}
									/>
									<InputFloat
										label={t('validation.fields.email')}
										placeholder={t('validation.fields.email')}
										{...form.getInputProps('email')}
									/>
									<InputFloat
										label={t('validation.fields.phone')}
										placeholder={t('validation.fields.phone')}
										{...form.getInputProps('phone')}
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
