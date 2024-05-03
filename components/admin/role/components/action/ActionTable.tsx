'use client';

import { featureSelectedState, roleState } from '@/store/feature/atom';
import { useSearchActions } from '@/utils/query-loader/action.loader';
import { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
	MRT_PaginationState,
	MRT_RowSelectionState,
	type MRT_ColumnDef,
} from 'mantine-react-table';
import { IAction } from '@/types';
import { useTranslations } from 'next-intl';
import { RenderTableBasic } from '@/libs/table';
import { ERROR_TIMEOUT } from '@/utils/config';
import { getPermissionsByFunction } from '@/utils/services/permission.service';
import { useCreatePermissionForFunction } from '@/utils/query-loader/permission.loader';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { filterNot } from '@/utils/array';
import { userState } from '@/store/user/atom';
import { Button } from '@mantine/core';

export const ActionTable = (): JSX.Element => {
	const t = useTranslations();
	const [searchContent, setSearchContent] = useState('');
	const [isChanged, setIsChanged] = useState(false);
	const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const featureSelected = useRecoilValue(featureSelectedState);
	const roleId = useRecoilValue(roleState);
	const userRecoil = useRecoilValue(userState);

	const {
		data: dataActions,
		isFetching,
		refetch,
	} = useSearchActions({
		params: {
			page_index: pagination.pageIndex + 1,
			page_size: pagination.pageSize,
			function_id: Number(featureSelected?.key),
			search_content: searchContent,
		},
		config: {
			enabled: !!featureSelected,
			onSuccess: async (data) => {
				if (data.message === ERROR_TIMEOUT) {
					refetch();
				}
				const newData = await getPermissionsByFunction({
					role_id: roleId,
					function_id: featureSelected?.key,
				});

				if (!newData?.message) {
					const obj: any = {};
					newData.forEach(
						(item: { action_code: string }) => (obj[item.action_code] = true),
					);
					setRowSelection(obj);
				}
			},
		},
	});

	const createPermissions = useCreatePermissionForFunction({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}

				setIsChanged(false);
				getNotifications('success', t, data.message);
			},
			onError: (err) => {
				const message = err?.response?.data?.message || err.message;

				getNotifications('error', t, message);
			},
		},
	});

	const handleOk = () => {
		const featureId = featureSelected?.key || '';
		const dataPost: any = {
			role_permission_list: [
				...Object.keys(rowSelection)?.map((i: any) => ({
					role_permission_id: '',
					role_id: roleId,
					function_id: featureId,
					action_code: i as string,
					active_flag: 1,
				})),
				...(filterNot(
					dataActions?.data || [],
					Object.keys(rowSelection),
					'action_code',
				).map((i) => ({
					role_permission_id: '',
					role_id: roleId,
					function_id: featureId,
					action_code: i.action_code as string,
					active_flag: 0,
				})) || []),
			],
			created_by_user_id: userRecoil.user_id || userRecoil.user_name,
		};
		createPermissions.mutate(dataPost);
	};

	const handleSelectionChange = (updateState: any) => {
		setIsChanged(true);
		setRowSelection(updateState);
	};

	const columns = useMemo<MRT_ColumnDef<IAction>[]>(
		() => [
			{
				accessorKey: 'action_code', //access nested data with dot notation
				header: t('actions.fields.action_code'),
			},
			{
				accessorKey: 'action_name', //access nested data with dot notation
				header: t('actions.fields.action_name'),
			},
			{
				accessorKey: 'description', //access nested data with dot notation
				header: t('actions.fields.description'),
			},
		],
		[t],
	);

	return (
		<RenderTableBasic
			enableRowSelection
			TopAction={
				<Button
					loading={createPermissions.isLoading}
					disabled={!isChanged}
					onClick={handleOk}
				>
					{t('global.btn_save')}
				</Button>
			}
			getRowId={(row) => row.action_code}
			columns={columns}
			data={dataActions?.data || []}
			pagination={pagination}
			setPagination={setPagination}
			searchContent={searchContent}
			setSearchContent={setSearchContent}
			isLoading={isFetching}
			totalItems={dataActions?.totalItems}
			onRowSelectionChange={handleSelectionChange}
			state={{ rowSelection }}
		/>
	);
};
