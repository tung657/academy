'use client';

import { Flex, Group, Image, Text, Tooltip } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { RenderTableParams } from '@/libs/table';
import { IResearch } from '@/types/research';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { useSearchResearch } from '@/utils/query-loader/research.loader';

import { ResearchType } from '../../research-type/ResearchType';
import { ResearchDelete } from './ResearchDelete';
import { ResearchModal } from './ResearchModal';

export const ResearchTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 5;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data: dataResearches, isFetching } = useSearchResearch({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<IResearch>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('researches.fields.serial'),
				size: 15,
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
					<Image
						w={80}
						mah={70}
						fit="contain"
						loading="lazy"
						src={original.thumbnail}
						alt={original.research_name}
					/>
				),
			},
			{
				accessorKey: 'research_name', //access nested data with dot notation
				header: t('researches.fields.research_name'),
				size: 100,
			},
			{
				accessorKey: 'research_type_name', //access nested data with dot notation
				header: t('researches.fields.research_type_name'),
				size: 100,
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
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<ResearchModal id={original.research_id} />
						<ResearchDelete
							label={original.research_name}
							id={original.research_id}
							path={original.thumbnail}
						/>
					</Flex>
				),
			},
		],
		[t],
	);

	return (
		<RenderTableParams
			defaultPageSize={+pageSize}
			columns={columns}
			data={dataResearches?.data || []}
			totalItems={dataResearches?.totalItems}
			isLoading={isFetching}
			TopAction={
				<Group>
					<ResearchModal />
					<ResearchType />
				</Group>
			}
		/>
	);
};
