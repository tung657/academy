'use client';

import { Flex, Image } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { RenderTableParams } from '@/libs/table';
import { IPartner } from '@/types/partner';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { useSearchPartner } from '@/utils/query-loader/partner.loader';

import { PartnerDelete } from './PartnerDelete';
import { PartnerModal } from './PartnerModal';

export const PartnerTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 5;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data: dataPartners, isFetching } = useSearchPartner({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<IPartner>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('partners.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'thumbnail', //access nested data with dot notation
				header: t('partners.fields.thumbnail'),
				size: 150,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				enableSorting: false,
				Cell: ({ row: { original } }) => (
					<Image
						w={150}
						mah={100}
						fit="contain"
						loading="lazy"
						src={original.thumbnail}
						alt={original.partner_name}
					/>
				),
			},
			{
				accessorKey: 'partner_name', //access nested data with dot notation
				header: t('partners.fields.partner_name'),
			},
			{
				header: t('partners.fields.action'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<PartnerModal id={original.partner_id} />
						<PartnerDelete
							label={original.partner_name}
							id={original.partner_id}
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
			data={dataPartners?.data || []}
			totalItems={dataPartners?.totalItems}
			defaultPageSize={5}
			isLoading={isFetching}
			TopAction={<PartnerModal />}
		/>
	);
};
