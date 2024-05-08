'use client';

import { Anchor, Flex, Group, Image, Text } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { ProductModal } from './ProductModal';
import { useSearchProducts } from '@/utils/query-loader/product.loader';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { ProductDelete } from './ProductDelete';
import { IProduct } from '@/types';
import { RenderTableParams } from '@/libs/table';
import { IconLink } from '@tabler/icons-react';

export const ProductTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data: dataProducts, isFetching } = useSearchProducts({
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
				size: 100,
				Cell: ({ renderedCellValue, row: { original } }) => (
					<Image src={renderedCellValue} alt={original.product_name} />
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
					<Text truncate="end" maw={200}>
						{renderedCellValue}
					</Text>
				),
			},
			{
				accessorKey: 'link', //access nested data with dot notation
				header: t('products.fields.link'),
				size: 60,
				Cell: ({ renderedCellValue }) => (
					<Anchor href={renderedCellValue?.toString()} target="_blank">
						<Group align="center" gap={4}>
							<IconLink stroke={1.2} size={20} /> Đường dẫn
						</Group>
					</Anchor>
				),
			},
			{
				accessorKey: 'slogan', //access nested data with dot notation
				header: t('products.fields.slogan'),
				size: 100,
			},
			{
				accessorKey: 'sort_order', //access nested data with dot notation
				header: t('products.fields.sort_order'),
				mantineTableBodyCellProps: {
					align: 'center',
				},
				size: 50,
			},
			{
				header: t('products.fields.action'),
				size: 70,
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<ProductModal id={original.product_id} />
						<ProductDelete
							label={original.product_name}
							id={original.product_id}
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
