'use client';

import { Anchor, Flex } from '@mantine/core';
import { IconLink } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { RenderTableParams } from '@/libs/table';
import { IBranch } from '@/types/branch';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { useSearchBranch } from '@/utils/query-loader/branch.loader';

import { BranchDelete } from './BranchDelete';
import { BranchModal } from './BranchModal';

export const BranchTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data: dataBranchs, isFetching } = useSearchBranch({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<IBranch>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('branches.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'branch_name', //access nested data with dot notation
				header: t('branches.fields.branch_name'),
			},
			{
				accessorKey: 'phone', //access nested data with dot notation
				header: t('branches.fields.phone'),
			},
			{
				accessorKey: 'address', //access nested data with dot notation
				header: t('branches.fields.address'),
			},
			{
				accessorKey: 'email', //access nested data with dot notation
				header: t('branches.fields.email'),
			},
			{
				accessorKey: 'embed_map', //access nested data with dot notation
				header: t('branches.fields.embed_map'),
				size: 100,
				Cell: ({ renderedCellValue }) => (
					<Anchor
						href={renderedCellValue?.toString()}
						target="_blank"
						rel="noopener"
					>
						<Flex align="center" gap={4}>
							<IconLink stroke={1.2} size={20} /> Đường dẫn
						</Flex>
					</Anchor>
				),
			},
			{
				header: t('branches.fields.action'),
				size: 70,
				mantineTableBodyCellProps: { align: 'center' },
				Cell: ({ row: { original } }) => (
					<Flex gap={8}>
						<BranchModal id={original.branch_id} />
						<BranchDelete
							label={original.branch_name}
							id={original.branch_id}
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
			data={dataBranchs?.data || []}
			totalItems={dataBranchs?.totalItems}
			isLoading={isFetching}
			TopAction={<BranchModal />}
		/>
	);
};
