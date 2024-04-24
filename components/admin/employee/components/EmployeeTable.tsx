'use client';

import { usePathname, useRouter } from '@/libs/i18n-navigation';
import { Flex } from '@mantine/core';
import dayjs from 'dayjs';
import {
	MRT_ColumnDef,
	MRT_PaginationState,
	MantineReactTable,
	useMantineReactTable,
} from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { EmployeeModal } from './EmployeeModal';
import { useSearchEmployees } from '@/utils/query-loader/user.loader';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { EmployeeDelete } from './EmployeeDelete';
import { EmployeeResetPw } from './EmployeeResetPw';

export const EmployeeTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';
	const router = useRouter();
	const pathname = usePathname();
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: +page - 1,
		pageSize: +pageSize,
	});

	const { data: dataEmployees, isLoading } = useSearchEmployees({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const handleFilter = (value: string) => {
		const current = new URLSearchParams(searchParams.toString());

		current.delete(SEARCH_PAGE);
		current.set(SEARCH_CONTENT, value || '');

		router.push(`${pathname}?${current}`);
		router.refresh();
	};

	useEffect(() => {
		if (pagination.pageIndex + 1 && pagination.pageSize) {
			const current = new URLSearchParams(searchParams.toString());

			current.set(SEARCH_PAGE, (pagination.pageIndex + 1).toString());
			current.set(SEARCH_SIZE, pagination.pageSize.toString());

			router.push(`${pathname}?${current}`);
			router.refresh();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);

	const columns = useMemo<MRT_ColumnDef<any>[]>(
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
				size: 150,
			},
			{
				accessorKey: 'full_name', //access nested data with dot notation
				header: t('employees.fields.full_name'),
			},
			{
				accessorKey: 'phone_number', //access nested data with dot notation
				header: t('employees.fields.phone_number'),
				size: 100,
			},
			{
				accessorKey: 'gender', //access nested data with dot notation
				header: t('employees.fields.gender'),
				size: 70,
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
				size: 100,
			},
			{
				header: t('employees.fields.action'),
				size: 70,
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

	const table = useMantineReactTable({
		columns,
		data: dataEmployees?.data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
		paginationDisplayMode: 'pages',
		renderTopToolbarCustomActions: () => <EmployeeModal />,
		initialState: {
			showGlobalFilter: true,
		},
		manualFiltering: true,
		enableColumnActions: false,
		onGlobalFilterChange: handleFilter,
		mantineSearchTextInputProps: {
			size: 'sm',
		},
		manualPagination: true,
		onPaginationChange: setPagination,
		mantinePaginationProps: {
			total:
				(dataEmployees?.totalItems || 0) / +pageSize +
				((dataEmployees?.totalItems || 0) % +pageSize ? 1 : 0),
			size: 'sm',
		},
		state: {
			isLoading,
			showProgressBars: isLoading,
			globalFilter: searchContent,
			pagination: {
				pageIndex: page ? +page - 1 : 0,
				pageSize: pageSize ? +pageSize : 10,
			},
		},
	});

	return <MantineReactTable table={table} />;
};
