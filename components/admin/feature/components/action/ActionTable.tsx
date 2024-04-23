'use client';

import { featureSelectedState } from '@/store/feature/atom';
import { useSearchActions } from '@/utils/query-loader/action.loader';
import { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
	MantineReactTable,
	useMantineReactTable,
	type MRT_ColumnDef,
} from 'mantine-react-table';
import { IAction } from '@/types';
import { useTranslations } from 'next-intl';

export const ActionTable = (): JSX.Element => {
	const featureSelected = useRecoilValue(featureSelectedState);
	const t = useTranslations();
	const [page] = useState(1);
	const [pageSize] = useState(10);
	const [searchContent, setSearchContent] = useState('');

	const { data: dataActions, isInitialLoading: isLoading } = useSearchActions({
		params: {
			page_size: pageSize,
			page_index: page,
			function_id: Number(featureSelected?.key),
			search_content: searchContent,
		},
		config: {
			enabled: !!featureSelected,
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
			{
				header: t('actions.fields.action'),
				size: 70,
			},
		],
		[t],
	);

	const table = useMantineReactTable({
		columns,
		data: dataActions || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
		paginationDisplayMode: 'pages',
		initialState: {
			showGlobalFilter: true,
		},
		manualFiltering: true,
		onGlobalFilterChange: setSearchContent,
		state: {
			isLoading,
			showProgressBars: isLoading,
			globalFilter: searchContent,
		},
	});

	return <MantineReactTable table={table} />;
};
