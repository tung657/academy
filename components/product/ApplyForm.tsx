'use client';

import { ButtonCustomProps } from '@/types';
import { Box, Button, FileInput, Grid, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { ModalRender } from '../mantines/modal/ModalRender';
import { isEmail, isNotEmpty, matches, useForm } from '@mantine/form';
import { getRuleForms } from '@/utils/validation';
import { patterns } from '@/utils';
import { dataJobs } from '../job/data/data-fake';
import { SelectRender } from '../mantines/inputs/SelectRender';
import { IconFileCv } from '@tabler/icons-react';

interface Props extends ButtonCustomProps {
	positionId?: number;
}

export const ApplyForm = ({ positionId, ...props }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();

	const jobOptions = dataJobs.map((i) => ({
		label: i.job_name,
		value: i.id.toString(),
	}));

	const form = useForm({
		...getRuleForms(),
		initialValues: {
			full_name: '',
			email: '',
			phone: '',
			facebook: '',
			position: positionId?.toString() || '',
			file: '',
		},
		validate: {
			full_name: isNotEmpty(t('validation.required')),
			email: isEmail(t('validation.email')),
			phone: matches(patterns.phone, t('validation.phone')),
			facebook: isNotEmpty(t('validation.required')),
			position: isNotEmpty(t('validation.required')),
			file: isNotEmpty(t('validation.required')),
		},
	});

	const handleClose = () => {
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
				onClose={handleClose}
				yOffset={85}
				title={t('job.title_modal')}
			>
				<Box component="form" onSubmit={form.onSubmit(() => {})}>
					<Grid gutter={24}>
						<Grid.Col span={{ lg: 6 }}>
							<TextInput
								label={t('job.fields.full_name')}
								placeholder={t('job.fields.full_name')}
								withAsterisk
								{...form.getInputProps('full_name')}
							/>
						</Grid.Col>
						<Grid.Col span={{ lg: 6 }}>
							<TextInput
								label={t('job.fields.email')}
								placeholder={t('job.fields.email')}
								withAsterisk
								{...form.getInputProps('email')}
							/>
						</Grid.Col>
						<Grid.Col span={{ lg: 6 }}>
							<TextInput
								label={t('job.fields.phone')}
								placeholder={t('job.fields.phone')}
								withAsterisk
								{...form.getInputProps('phone')}
							/>
						</Grid.Col>
						<Grid.Col span={{ lg: 6 }}>
							<TextInput
								label={t('job.fields.facebook')}
								placeholder={t('job.fields.facebook')}
								withAsterisk
								{...form.getInputProps('facebook')}
							/>
						</Grid.Col>
						<Grid.Col>
							<SelectRender
								label={t('job.fields.position')}
								placeholder={t('job.fields.position')}
								withAsterisk
								data={jobOptions}
								{...form.getInputProps('position')}
							/>
						</Grid.Col>
						<Grid.Col>
							<FileInput
								leftSection={<IconFileCv />}
								label={t('job.fields.file')}
								placeholder={t('job.fields.file')}
								leftSectionPointerEvents="none"
							/>
							<Text mt={4} c={'yellow'} fz={14}>
								{t('job.note_form')}
							</Text>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
