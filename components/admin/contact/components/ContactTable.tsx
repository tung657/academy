'use client';

import { Flex } from '@mantine/core';

import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useSearchContact } from '@/utils/query-loader/contact.loader';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';

import { RenderTableParams } from '@/libs/table';
import { IContact } from '@/types/contact';
import { ContactDelete } from './ContactDelete';

export const ContactTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data: dataContacts, isFetching } = useSearchContact({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<IContact>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('contacts.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'customer_name', //access nested data with dot notation
				header: t('contacts.fields.customer_name'),
			},
			{
				accessorKey: 'email', //access nested data with dot notation
				header: t('contacts.fields.email'),
			},
			{
				accessorKey: 'phone_number', //access nested data with dot notation
				header: t('contacts.fields.phone_number'),
			},
			{
				accessorKey: 'description', //access nested data with dot notation
				header: t('contacts.fields.description'),
			},
			{
				header: t('contacts.fields.action'),
				size: 70,
				mantineTableBodyCellProps: { align: 'center' },
				Cell: ({ row: { original } }) => (
					<Flex gap={8}>
						<ContactDelete
							label={original.customer_name}
							id={original.contact_id}
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
			data={dataContacts?.data || []}
			totalItems={dataContacts?.totalItems}
			isLoading={isFetching}
		/>
	);
};
