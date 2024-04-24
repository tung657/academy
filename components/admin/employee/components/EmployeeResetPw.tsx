'use client';

import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { useRestorePw } from '@/utils/query-loader/user.loader';
import { ActionIcon, Box, Center, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconRestore } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface Props {
	label: string;
	id: string | number;
}

export const EmployeeResetPw = ({ label, id }: Props): JSX.Element => {
	const [opened, { open, close }] = useDisclosure();
	const t = useTranslations();

	const restorePw = useRestorePw({
		config: {
			onSuccess: async (data) => {
				if (data.success === false) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications(
					'success',
					t,
					data.message,
					'Mật khẩu mới là ' + data.data,
				);
				handleCloseModal();
			},
			onError: (error) => {
				getNotifications('error', t, error.message);
			},
		},
	});

	const handleSubmit = () => {
		restorePw.mutate(id);
	};

	const handleOpenModal = () => {
		open();
	};

	const handleCloseModal = () => {
		close();
	};

	return (
		<>
			<Tooltip label={t('global.restore_pw')}>
				<ActionIcon
					radius={'md'}
					variant="default"
					c="blue"
					onClick={handleOpenModal}
				>
					<IconRestore style={{ width: '80%', height: '80%' }} />
				</ActionIcon>
			</Tooltip>
			<ModalRender
				opened={opened}
				onClose={handleCloseModal}
				title={t('employees.title_restore')}
				footer={{
					onOk: () => handleSubmit(),
					isConfirming: restorePw.isLoading,
					okText: t('global.btn_confirm'),
				}}
			>
				<Box>
					<Center>
						<Text fw={700} fz={18}>
							{t('employees.warning_reset')}{' '}
							<Text component="span" fw={700} fz={18} c="red">
								{label}
							</Text>{' '}
							?
						</Text>
					</Center>
				</Box>
			</ModalRender>
		</>
	);
};
