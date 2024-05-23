'use client';

import { Flex, Image, Text, Tooltip } from '@mantine/core';
import dayjs from 'dayjs';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { RenderTableParams } from '@/libs/table';
import { IBlog } from '@/types/blog';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { formatDateShow } from '@/utils/format-string';
import { useSearchBlog } from '@/utils/query-loader/blog.loader';

import { BlogDelete } from './BlogDelete';
import { BlogModal } from './BlogModal';

export const BlogTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 5;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data: dataBlogs, isFetching } = useSearchBlog({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<IBlog>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('blog-management.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'thumbnail', //access nested data with dot notation
				header: t('blog-management.fields.thumbnail'),
				size: 70,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				enableSorting: false,
				Cell: ({ row: { original } }) => (
					<Image
						w={70}
						mah={50}
						fit="contain"
						loading="lazy"
						src={original.thumbnail}
						alt={original.title}
					/>
				),
			},
			{
				accessorKey: 'title', //access nested data with dot notation
				header: t('blog-management.fields.title'),
			},
			{
				accessorKey: 'meta_content', //access nested data with dot notation
				header: t('blog-management.fields.meta_content'),
				size: 150,
				Cell: ({ renderedCellValue }) => (
					<Tooltip label={renderedCellValue}>
						<Text truncate="end" maw={200}>
							{renderedCellValue}
						</Text>
					</Tooltip>
				),
			},
			{
				accessorKey: 'research_type_name', //access nested data with dot notation
				header: t('blog-management.fields.research_type_name'),
				size: 100,
			},
			{
				accessorKey: 'read_time', //access nested data with dot notation
				header: t('blog-management.fields.read_time'),
				mantineTableBodyCellProps: {
					align: 'center',
				},
				size: 75,
			},
			{
				accessorKey: 'viewed', //access nested data with dot notation
				header: t('blog-management.fields.viewed'),
				mantineTableBodyCellProps: {
					align: 'center',
				},
				size: 70,
			},
			{
				accessorKey: 'created_date_time', //access nested data with dot notation
				header: t('blog-management.fields.created_date_time'),
				mantineTableBodyCellProps: {
					align: 'center',
				},
				size: 75,
				enableSorting: false,
				Cell: ({ row: { original } }) => (
					<Text>
						{dayjs(original.created_date_time).format(formatDateShow)}
					</Text>
				),
			},
			{
				header: t('blog-management.fields.action'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<BlogModal id={original.blog_id} />
						<BlogDelete
							label={original.title}
							id={original.blog_id}
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
			columns={columns}
			data={dataBlogs?.data || []}
			totalItems={dataBlogs?.totalItems}
			defaultPageSize={5}
			isLoading={isFetching}
			TopAction={<BlogModal />}
		/>
	);
};
