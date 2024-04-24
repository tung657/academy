'use client';

import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { userState } from '@/store/user/atom';
import { IBaseDelete } from '@/types';
import { queryClient } from '@/utils/query-loader/react-query';
import {
	CACHE_EMPLOYEES,
	useDeleteEmployee,
} from '@/utils/query-loader/user.loader';
import { ActionIcon, Box, Center, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';

interface Props {
	label: string;
	id: string | number;
}

export const EmployeeDelete = ({ label, id }: Props): JSX.Element => {
	const [opened, { open, close }] = useDisclosure();
	const t = useTranslations();

	const userProfile = useRecoilValue(userState);

	const deleteQuery = useDeleteEmployee({
		config: {
			onSuccess: async (data) => {
				if (data.success === false) {
					getNotifications('error', t, data.message);
					return;
				}
				getNotifications('success', t, data.message);
				await queryClient.invalidateQueries([CACHE_EMPLOYEES.SEARCH]);
				handleCloseModal();
			},
			onError: (error) => {
				getNotifications('error', t, error.message);
			},
		},
	});

	const handleSubmit = () => {
		const dataPost: IBaseDelete = {
			list_json: [{ employee_id: id }],
			lu_user_id: userProfile.user_id,
		};

		deleteQuery.mutate(dataPost);
	};

	const handleOpenModal = () => {
		open();
	};

	const handleCloseModal = () => {
		close();
	};

	return (
		<>
			<Tooltip label={t('global.delete')}>
				<ActionIcon
					radius={'md'}
					variant="default"
					c="red"
					onClick={handleOpenModal}
					disabled={id === userProfile.user_name}
				>
					<IconTrash style={{ width: '80%', height: '80%' }} />
				</ActionIcon>
			</Tooltip>
			<ModalRender
				opened={opened}
				onClose={handleCloseModal}
				title={t('employees.title_delete')}
				footer={{
					onOk: () => handleSubmit(),
					isConfirming: deleteQuery.isLoading,
					okText: t('global.btn_confirm'),
				}}
			>
				<Box>
					<Center>
						<Text fw={700} fz={18}>
							{t('messages.warning_delete')}{' '}
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
