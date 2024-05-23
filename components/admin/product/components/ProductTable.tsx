'use client';

import { Anchor, Flex, Image, Text, Tooltip } from '@mantine/core';
import { IconLink } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { RenderTableParams } from '@/libs/table';
import { IProduct } from '@/types';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { useSearchProduct } from '@/utils/query-loader/product.loader';

import { ProductDelete } from './ProductDelete';
import { ProductModal } from './ProductModal';

export const ProductTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data: dataProducts, isFetching } = useSearchProduct({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<IProduct>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('products.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'thumbnail', //access nested data with dot notation
				header: t('products.fields.thumbnail'),
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
						alt={original.product_name}
					/>
				),
			},
			{
				accessorKey: 'product_name', //access nested data with dot notation
				header: t('products.fields.product_name'),
				size: 100,
			},
			{
				accessorKey: 'description', //access nested data with dot notation
				header: t('products.fields.description'),
				Cell: ({ renderedCellValue }) => (
					<Tooltip label={renderedCellValue}>
						<Text truncate="end" maw={400}>
							{renderedCellValue}
						</Text>
					</Tooltip>
				),
			},
			{
				accessorKey: 'slogan', //access nested data with dot notation
				header: t('products.fields.slogan'),
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
				accessorKey: 'link', //access nested data with dot notation
				header: t('products.fields.link'),
				size: 70,
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
				accessorKey: 'sort_order', //access nested data with dot notation
				header: t('products.fields.sort_order'),
				mantineTableBodyCellProps: {
					align: 'center',
				},
				size: 15,
			},
			{
				header: t('products.fields.action'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<ProductModal id={original.product_id} />
						<ProductDelete
							label={original.product_name}
							id={original.product_id}
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
			data={dataProducts?.data || []}
			totalItems={dataProducts?.totalItems}
			isLoading={isFetching}
			TopAction={<ProductModal />}
		/>
	);
};
