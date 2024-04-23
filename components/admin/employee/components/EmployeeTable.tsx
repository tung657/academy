'use client';

import {
	MRT_ColumnDef,
	MantineReactTable,
	useMantineReactTable,
} from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export const EmployeeTable = (): JSX.Element => {
	const t = useTranslations();

	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('employees.fields.serial'),
			},
			{
				accessorKey: 'username', //access nested data with dot notation
				header: t('employees.fields.username'),
			},
			{
				accessorKey: 'position', //access nested data with dot notation
				header: t('employees.fields.position'),
			},
			{
				accessorKey: 'full_name', //access nested data with dot notation
				header: t('employees.fields.full_name'),
			},
			{
				accessorKey: 'phone_number', //access nested data with dot notation
				header: t('employees.fields.phone_number'),
			},
			{
				accessorKey: 'gender', //access nested data with dot notation
				header: t('employees.fields.gender'),
			},
			{
				accessorKey: 'birth', //access nested data with dot notation
				header: t('employees.fields.birth'),
			},
			{
				accessorKey: 'email', //access nested data with dot notation
				header: t('employees.fields.email'),
			},
			{
				header: t('employees.fields.action'),
				size: 70,
			},
		],
		[t],
	);

	const table = useMantineReactTable({
		columns,
		data: [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
		paginationDisplayMode: 'pages',
		initialState: {
			showGlobalFilter: true,
		},
		manualFiltering: true,
		// onGlobalFilterChange: setSearchContent,
		state: {
			// isLoading,
			// showProgressBars: isLoading,
			// globalFilter: searchContent,
		},
	});

	return <MantineReactTable table={table} />;
};
