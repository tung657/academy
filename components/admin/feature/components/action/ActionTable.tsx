'use client';

import { Flex } from '@mantine/core';
import { type MRT_ColumnDef, MRT_PaginationState } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { RenderTableBasic } from '@/libs/table';
import { featureSelectedState } from '@/store/feature/atom';
import { IAction } from '@/types';
import { useSearchActions } from '@/utils/query-loader/action.loader';

import { ActionDelete } from './ActionDelete';
import { ActionModal } from './ActionModal';

export const ActionTable = (): JSX.Element => {
	const featureSelected = useRecoilValue(featureSelectedState);
	const t = useTranslations();
	const [searchContent, setSearchContent] = useState('');
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data: dataActions, isFetching } = useSearchActions({
		params: {
			page_index: pagination.pageIndex + 1,
			page_size: pagination.pageSize,
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
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<ActionModal id={original.action_code} />
						<ActionDelete
							label={original.action_name}
							id={original.action_code}
						/>
					</Flex>
				),
			},
		],
		[t],
	);

	return (
		<RenderTableBasic
			columns={columns}
			data={dataActions?.data || []}
			pagination={pagination}
			setPagination={setPagination}
			searchContent={searchContent}
			setSearchContent={setSearchContent}
			isLoading={isFetching}
			totalItems={dataActions?.totalItems}
			TopAction={<ActionModal />}
		/>
	);
};
