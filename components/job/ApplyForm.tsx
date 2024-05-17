'use client';

import { ButtonCustomProps } from '@/types';
import { Box, Button, FileInput, Grid, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { ModalRender } from '../mantines/modal/ModalRender';
import { isEmail, isNotEmpty, matches, useForm } from '@mantine/form';
import { getRuleForms } from '@/utils/validation';
import { SelectRender } from '../mantines/inputs/SelectRender';
import { IconFileCv } from '@tabler/icons-react';
import { patterns, removeVietnameseTones } from '@/utils/format-string';
import { useState } from 'react';
import { useCreateCV } from '@/utils/query-loader/cv.loader';
import { getNotifications } from '../mantines/notification/getNotifications';
import { ICV } from '@/types/cv';
import { uploadFile } from '@/utils/services/file.service';
import { useGetJobDropdown } from '@/utils/query-loader/job.loader';

interface Props extends ButtonCustomProps {
	positionId?: number;
}

export const ApplyForm = ({ positionId, ...props }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();
	const [loading, setLoading] = useState(false);

	const form = useForm({
		...getRuleForms(),
		initialValues: {
			candidate_name: '',
			email: '',
			phone_number: '',
			fb_link: '',
			position_id: positionId?.toString() || '',
		},
		validate: {
			candidate_name: isNotEmpty(t('validation.required')),
			email: isEmail(t('validation.email')),
			phone_number: matches(patterns.phone, t('validation.phone')),
			position_id: isNotEmpty(t('validation.required')),
			cv: isNotEmpty(t('validation.required')),
		},
	});

	const createQuery = useCreateCV({
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

	const { data: jobOptions, isLoading: loadingJob } = useGetJobDropdown({});

	const handleSubmit = async (values: any) => {
		setLoading(true);

		const dataPost: ICV = {
			...values,
			created_by_user_id: values.candidate_name,
		};

		if (values.cv) {
			const formData = new FormData();
			formData.append('file', values.cv, removeVietnameseTones(values.cv.name));
			const dataUpload = await uploadFile(formData);
			if (dataUpload.url) dataPost.cv = dataUpload.url;
		}

		await createQuery.mutateAsync(dataPost);

		setLoading(false);
	};

	const handleCancel = () => {
		form.reset();
		close();
	};

	return (
		<>
			<Button radius={'xl'} onClick={open} {...props}>
				{t('global.apply')}
			</Button>

			<ModalRender
				opened={opened}
				onClose={handleCancel}
				yOffset={85}
				title={t('jobs.title_modal')}
				footer={{
					onOk: form.onSubmit(handleSubmit),
					isConfirming: loading,
				}}
			>
				<Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
					<Grid gutter={24}>
						<Grid.Col span={{ lg: 6 }}>
							<TextInput
								label={t('jobs.fields.candidate_name')}
								placeholder={t('jobs.fields.candidate_name')}
								withAsterisk
								{...form.getInputProps('candidate_name')}
							/>
						</Grid.Col>
						<Grid.Col span={{ lg: 6 }}>
							<TextInput
								label={t('jobs.fields.email')}
								placeholder={t('jobs.fields.email')}
								withAsterisk
								{...form.getInputProps('email')}
							/>
						</Grid.Col>
						<Grid.Col span={{ lg: 6 }}>
							<TextInput
								label={t('jobs.fields.phone_number')}
								placeholder={t('jobs.fields.phone_number')}
								withAsterisk
								{...form.getInputProps('phone_number')}
							/>
						</Grid.Col>
						<Grid.Col span={{ lg: 6 }}>
							<TextInput
								label={t('jobs.fields.fb_link')}
								placeholder={t('jobs.fields.fb_link')}
								{...form.getInputProps('fb_link')}
							/>
						</Grid.Col>
						<Grid.Col>
							<SelectRender
								label={t('jobs.fields.position')}
								placeholder={t('jobs.fields.position')}
								withAsterisk
								data={jobOptions ? jobOptions : []}
								loading={loadingJob}
								{...form.getInputProps('position_id')}
							/>
						</Grid.Col>
						<Grid.Col>
							<FileInput
								leftSection={<IconFileCv />}
								label={t('jobs.fields.cv')}
								placeholder={t('jobs.fields.cv')}
								leftSectionPointerEvents="none"
								accept=".pdf"
								multiple={false}
								{...form.getInputProps('cv')}
							/>
							<Text mt={4} c={'yellow'} fz={14}>
								{t('jobs.note_form')}
							</Text>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
