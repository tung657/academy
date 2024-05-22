'use client';

import { Center, Flex, Image, Text, Tooltip } from '@mantine/core';
import { MRT_ColumnDef, MRT_PaginationState } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { RenderTableBasic } from '@/libs/table';
import { IResearchType } from '@/types/research-type';
import { useSearchResearchType } from '@/utils/query-loader/research-type.loader';

import { ResearchTypeDelete } from './ResearchTypeDelete';
import { ResearchTypeModal } from './ResearchTypeModal';

export const ResearchTypeTable = (): JSX.Element => {
	const t = useTranslations();
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	});
	const [searchContent, setSearchContent] = useState('');

	const { data: dataResearchTypes, isFetching } = useSearchResearchType({
		params: {
			page_index: pagination.pageIndex + 1,
			page_size: pagination.pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<IResearchType>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('researches.fields.serial'),
				size: 25,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'thumbnail', //access nested data with dot notation
				header: t('researches.fields.thumbnail'),
				size: 70,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				enableSorting: false,
				Cell: ({ row: { original } }) => (
					<Center>
						<Image
							w={80}
							mah={70}
							fit="contain"
							loading="lazy"
							src={original.thumbnail}
							alt={original.research_type_name}
						/>
					</Center>
				),
			},
			{
				accessorKey: 'research_type_name', //access nested data with dot notation
				header: t('researches.fields.research_type_name'),
			},
			{
				accessorKey: 'slogan', //access nested data with dot notation
				header: t('researches.fields.slogan'),
				size: 100,
				Cell: ({ renderedCellValue }) => (
					<Tooltip label={renderedCellValue}>
						<Text truncate="end" maw={200}>
							{renderedCellValue}
						</Text>
					</Tooltip>
				),
			},
			{
				header: t('researches.fields.action'),
				size: 25,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<ResearchTypeModal id={original.research_type_id} />
						<ResearchTypeDelete
							label={original.research_type_name}
							id={original.research_type_id}
							path={original.thumbnail}
						/>
					</Flex>
				),
			},
		],
		[t],
	);

	return (
		<RenderTableBasic
			setSearchContent={setSearchContent}
			pagination={pagination}
			setPagination={setPagination}
			searchContent={searchContent}
			enabledToolbar={false}
			columns={columns}
			data={dataResearchTypes?.data || []}
			totalItems={dataResearchTypes?.totalItems}
			isLoading={isFetching}
			TopAction={<ResearchTypeModal />}
		/>
	);
};
