'use client';

import { Flex } from '@mantine/core';

import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { PositionModal } from './PositionModal';
import { useSearchPosition } from '@/utils/query-loader/position.loader';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { PositionDelete } from './PositionDelete';
import { IPosition } from '@/types';
import { RenderTableParams } from '@/libs/table';

export const PositionTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data: dataPositions, isFetching } = useSearchPosition({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<IPosition>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('positions.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'position_name', //access nested data with dot notation
				header: t('positions.fields.position'),
			},

			{
				accessorKey: 'description', //access nested data with dot notation
				header: t('positions.fields.description'),
			},
			{
				header: t('positions.fields.action'),
				size: 70,
				mantineTableBodyCellProps: { align: 'center' },
				Cell: ({ row: { original } }) => (
					<Flex gap={8}>
						<PositionModal id={original.position_id} />
						<PositionDelete
							label={original.position_name}
							id={original.position_id}
						/>
					</Flex>
				),
			},
		],
		[t],
	);

	return (
		<RenderTableParams
			columns={columns}
			data={dataPositions?.data || []}
			totalItems={dataPositions?.totalItems}
			isLoading={isFetching}
			TopAction={<PositionModal />}
		/>
	);
};
