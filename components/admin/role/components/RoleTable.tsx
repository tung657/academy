'use client';

import { Box, Button, Flex, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { RenderTableParams } from '@/libs/table';
import { userState } from '@/store/user/atom';
import { IRole } from '@/types';
import {
	ERROR_TIMEOUT,
	SEARCH_CONTENT,
	SEARCH_PAGE,
	SEARCH_SIZE,
} from '@/utils/config';
import { useSearchRoles } from '@/utils/query-loader/role.loader';

import { RoleDelete } from './RoleDelete';
import { RoleModal } from './RoleModal';

export const RoleTable = (): JSX.Element => {
	const [opened, { open, close }] = useDisclosure();
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || '1';
	const pageSize = searchParams.get(SEARCH_SIZE) || '10';
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const userRecoil = useRecoilValue(userState);

	const {
		data: dataRoles,
		isFetching: loading,
		refetch: refetchRole,
	} = useSearchRoles({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
			user_id: userRecoil.user_id,
		},
		config: {
			enabled: opened,
			onSuccess: async (data) => {
				// Init role
				if (data.message === ERROR_TIMEOUT) {
					refetchRole();
				}
			},
		},
	});

	const handleOpenModal = () => {
		open();
	};

	const handleCloseModal = () => {
		close();
	};

	const columns = useMemo<MRT_ColumnDef<IRole>[]>(
		() => [
			{
				header: t('roles.fields.serial'),
				size: 50,
				Cell: ({ renderedRowIndex }) => (renderedRowIndex || 0) + 1,
			},
			{
				accessorKey: 'role_code',
				header: t('roles.fields.role_code'),
				size: 150,
			},
			{
				accessorKey: 'role_name',
				header: t('roles.fields.role_name'),
				size: 200,
			},
			{
				accessorKey: 'description',
				header: t('roles.fields.description'),
			},
			{
				header: t('actions.fields.action'),
				size: 70,
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<RoleModal id={original.role_id.toString()} />
						<RoleDelete label={original.role_name} id={original.role_id} />
					</Flex>
				),
			},
		],
		[t],
	);

	return (
		<>
			<Button onClick={handleOpenModal} variant="gradient">
				{t('roles.title_update')}
			</Button>
			<ModalRender
				size={900}
				opened={opened}
				closeOnEscape={false}
				onClose={handleCloseModal}
				title={t('roles.title_update')}
				footer={{ hasContent: false }}
			>
				<Box>
					<LoadingOverlay visible={false} />

					<RenderTableParams
						TopAction={<RoleModal />}
						columns={columns}
						data={dataRoles?.data || []}
						enabledToolbar={false}
						isLoading={loading}
					/>
				</Box>
			</ModalRender>
		</>
	);
};
