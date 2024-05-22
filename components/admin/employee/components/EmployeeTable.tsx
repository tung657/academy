'use client';

import { Flex } from '@mantine/core';
import dayjs from 'dayjs';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { RenderTableParams } from '@/libs/table';
import { IEmployee } from '@/types';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { useSearchEmployees } from '@/utils/query-loader/user.loader';

import { EmployeeDelete } from './EmployeeDelete';
import { EmployeeModal } from './EmployeeModal';
import { EmployeeResetPw } from './EmployeeResetPw';

export const EmployeeTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data: dataEmployees, isFetching } = useSearchEmployees({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<IEmployee>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('employees.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'employee_id', //access nested data with dot notation
				header: t('employees.fields.employee_id'),
				size: 100,
			},
			{
				accessorKey: 'position_name', //access nested data with dot notation
				header: t('employees.fields.position'),
				size: 100,
			},
			{
				accessorKey: 'full_name', //access nested data with dot notation
				header: t('employees.fields.full_name'),
			},
			{
				accessorKey: 'phone_number', //access nested data with dot notation
				header: t('employees.fields.phone_number'),
				enableSorting: false,
				size: 80,
			},
			{
				accessorKey: 'gender', //access nested data with dot notation
				header: t('employees.fields.gender'),
				enableSorting: false,
				size: 60,
				Cell: ({ renderedCellValue }) =>
					renderedCellValue === 1 ? 'Nam' : 'Nữ',
			},
			{
				accessorKey: 'date_of_birth', //access nested data with dot notation
				header: t('employees.fields.birth'),
				size: 70,
				Cell: ({ renderedCellValue }) =>
					dayjs(renderedCellValue?.toString()).format('DD/MM/YYYY'),
			},
			{
				accessorKey: 'email', //access nested data with dot notation
				header: t('employees.fields.email'),
				size: 140,
			},
			{
				header: t('employees.fields.action'),
				size: 80,
				mantineTableBodyCellProps: { align: 'center' },
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<EmployeeResetPw
							label={original.full_name}
							id={original.employee_id}
						/>
						<EmployeeModal id={original.employee_id} />
						<EmployeeDelete
							label={original.full_name}
							id={original.employee_id}
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
			data={dataEmployees?.data || []}
			totalItems={dataEmployees?.totalItems}
			isLoading={isFetching}
			TopAction={<EmployeeModal />}
		/>
	);
};
