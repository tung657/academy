import {
	ActionIcon,
	Box,
	Grid,
	LoadingOverlay,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { isEmail, isNotEmpty, matches, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEye } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { convertToString } from '@/utils/array';
import { patterns } from '@/utils/format-string';
import { useGetContactById } from '@/utils/query-loader/contact.loader';
import { getRuleForms } from '@/utils/validation';

interface Props {
	id?: string;
}

export const ContactModal = ({ id }: Props): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();

	const form = useForm({
		...getRuleForms(),
		initialValues: {
			contact_id: '',
			customer_name: '',
			email: '',
			phone_number: '',
			message: '',
		},
		validate: {
			contact_id: matches(patterns.username, t('validation.username')),
			customer_name: isNotEmpty(t('validation.required')),
			phone_number: matches(patterns.phone, t('validation.phone')),
			email: isEmail(t('validation.email')),
			message: isNotEmpty(t('validation.required')),
		},
	});

	console.log(id);
	const getDetail = useGetContactById({
		id: id!,
		config: {
			enabled: !!id && opened,
			onSuccess: (data) => {
				if (data.success === false) {
					getNotifications('error', t, data.message);
					return;
				}

				// form.setValues(convertToString(data) as any);
				form.setValues({
					...convertToString(data),
				});
			},
		},
	});

	return (
		<>
			<Tooltip label={t('xem chi tiết')}>
				<ActionIcon radius={'md'} variant="default" c="yellow" onClick={open}>
					<IconEye style={{ width: '80%', height: '80%' }} />
				</ActionIcon>
			</Tooltip>

			<ModalRender
				opened={opened}
				onClose={close}
				size={'60%'}
				title={t('contacts.getdetail')}
				footer={{ hasContent: false }}
			>
				<Box component="form">
					<LoadingOverlay visible={getDetail.isFetching} />
					<Grid gutter={16}>
						<Grid.Col span={12}>
							<TextInput
								size="sm"
								label={t('contacts.fields.customer_name')}
								placeholder={t('contacts.fields.customer_name')}
								withAsterisk
								{...form.getInputProps('customer_name')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<TextInput
								size="sm"
								label={t('contacts.fields.phone_number')}
								placeholder={t('contacts.fields.phone_number')}
								{...form.getInputProps('phone_number')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<TextInput
								size="sm"
								label={t('contacts.fields.email')}
								placeholder={t('contacts.fields.email')}
								{...form.getInputProps('email')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<TextInput
								size="sm"
								label={t('contacts.fields.message')}
								placeholder={t('contacts.fields.message')}
								{...form.getInputProps('message')}
							/>
						</Grid.Col>
					</Grid>
				</Box>
			</ModalRender>
		</>
	);
};
