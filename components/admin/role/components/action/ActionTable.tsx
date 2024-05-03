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

export const ActionTable = (): JSX.Element => {
	const featureSelected = useRecoilValue(featureSelectedState);
	const t = useTranslations();
	const [searchContent, setSearchContent] = useState('');
	const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const roleId = useRecoilValue(roleState);
	const functionId = useRecoilValue(featureSelectedState);

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
					roleId,
					functionId,
				});

				if (!newData?.message) setRowSelection(newData);
			},
		},
	});

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
			columns={columns}
			data={dataActions?.data || []}
			pagination={pagination}
			setPagination={setPagination}
			searchContent={searchContent}
			setSearchContent={setSearchContent}
			isLoading={isFetching}
			totalItems={dataActions?.totalItems}
			onRowSelectionChange={setRowSelection}
			state={{ rowSelection }}
		/>
	);
};
