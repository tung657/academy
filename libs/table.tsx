'use client';

import {
	MRT_PaginationState,
	MRT_TableOptions,
	MantineReactTable,
	useMantineReactTable,
} from 'mantine-react-table';
import { useSearchParams } from 'next/navigation';
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { useRecoilValue } from 'recoil';

import { usePathname, useRouter } from '@/libs/i18n-navigation';
import { colorSchemeState } from '@/store/theme/atom';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { calcTotalPages } from '@/utils/format-number';

interface Props extends MRT_TableOptions<any> {
	columns: any;
	totalItems?: number;
	isLoading?: boolean;
}

interface ITableParams extends Props {
	TopAction?: ReactNode;
	enabledToolbar?: boolean;
	enabledSearch?: boolean;
	defaultPageSize?: number;
}

interface ITableBasic extends Props {
	enabledToolbar?: boolean;
	enabledSearch?: boolean;
	TopAction?: ReactNode;
	pagination: MRT_PaginationState;
	setPagination: Dispatch<SetStateAction<MRT_PaginationState>>;
	searchContent: string;
	setSearchContent: Dispatch<SetStateAction<string>>;
}

export const RenderTableParams = ({
	columns,
	data,
	totalItems = data?.length || 0,
	isLoading = false,
	TopAction = null,
	enabledToolbar = true,
	enabledSearch = true,
	defaultPageSize = 10,
	...props
}: ITableParams): JSX.Element => {
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || defaultPageSize;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';
	const router = useRouter();
	const pathname = usePathname();
	const colorScheme = useRecoilValue(colorSchemeState);
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: +page - 1,
		pageSize: +pageSize,
	});

	const handleFilter = (value: string) => {
		const current = new URLSearchParams(searchParams.toString());

		current.delete(SEARCH_PAGE);
		current.set(SEARCH_CONTENT, value || '');

		router.push(`${pathname}?${current}`);
		router.refresh();
	};

	useEffect(() => {
		//do something when the pagination state changes
		const current = new URLSearchParams(searchParams.toString());

		current.set(SEARCH_PAGE, (+pagination.pageIndex + 1).toString());
		current.set(SEARCH_SIZE, pagination.pageSize.toString());

		router.push(`${pathname}?${current}`);
		router.refresh();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination.pageIndex, pagination.pageSize]);

	const table = useMantineReactTable({
		columns,
		data: data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
		paginationDisplayMode: 'pages',
		mantineTableBodyCellProps: (cell) => {
			if (cell.cell.id.includes('mrt-row-select'))
				return {
					align: 'center',
				};

			return cell.cell;
		},
		layoutMode: 'grid',
		renderTopToolbarCustomActions: () => TopAction,
		initialState: {
			showGlobalFilter: enabledSearch,
		},
		enableGlobalFilter: enabledSearch,
		enableToolbarInternalActions: enabledToolbar,
		manualFiltering: true,
		enableColumnActions: false,
		onGlobalFilterChange: handleFilter,
		mantineSearchTextInputProps: {
			size: 'sm',
			placeholder: 'Tìm kiếm',
		},
		manualPagination: true,
		onPaginationChange: setPagination,
		mantinePaginationProps: {
			total: calcTotalPages(pageSize, totalItems),
			size: 'sm',
			rowsPerPageOptions: ['5', '10', '50', '100'],
		},
		mantineTopToolbarProps: {
			display: TopAction || enabledSearch || enabledToolbar ? 'grid' : 'none',
		},
		mantineTableHeadCellProps: {
			align: 'center',
			bg: colorScheme === 'light' ? '#DFE2E2' : 'dark',
			p: 8,
			style: {
				borderInlineEnd: '1px solid #f0f0f0',
			},
		},
		mantineTableProps: {
			withRowBorders: true,
			withColumnBorders: true,
			borderColor: '#f0f0f0',
		},
		...props,
		state: {
			isLoading,
			showProgressBars: isLoading,
			globalFilter: searchContent,
			pagination: {
				pageIndex: page ? +page - 1 : 0,
				pageSize: pageSize ? +pageSize : 10,
			},
			...props.state,
		},
	});

	return <MantineReactTable table={table} />;
};

export const RenderTableBasic = ({
	columns,
	data,
	isLoading = false,
	enabledSearch = true,
	enabledToolbar = true,
	TopAction = null,
	totalItems = data?.length || 0,
	pagination,
	setPagination,
	searchContent,
	setSearchContent,
	...props
}: ITableBasic): JSX.Element => {
	const colorScheme = useRecoilValue(colorSchemeState);

	const handleFilter = (value: string) => {
		setPagination((prev) => ({
			...prev,
			pageIndex: 0,
		}));
		setSearchContent(value);
	};

	const table = useMantineReactTable({
		columns,
		data: data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
		paginationDisplayMode: 'pages',
		mantineTableBodyCellProps: (cell) => {
			if (cell.cell.id.includes('mrt-row-select'))
				return {
					align: 'center',
				};

			return cell.cell;
		},
		renderTopToolbarCustomActions: () => TopAction,
		initialState: {
			showGlobalFilter: enabledSearch,
		},
		enableGlobalFilter: enabledSearch,
		enableToolbarInternalActions: enabledToolbar,
		manualFiltering: true,
		enableColumnActions: false,
		onGlobalFilterChange: handleFilter,
		mantineSearchTextInputProps: {
			size: 'sm',
			placeholder: 'Tìm kiếm',
		},
		manualPagination: true,
		onPaginationChange: setPagination,
		mantinePaginationProps: {
			rowsPerPageOptions: ['5', '10', '50', '100'],
			total: calcTotalPages(pagination.pageSize, totalItems),
			size: 'sm',
		},
		mantineTopToolbarProps: {
			display: TopAction || enabledSearch || enabledToolbar ? 'grid' : 'none',
		},
		mantineTableHeadCellProps: {
			align: 'center',
			bg: colorScheme === 'light' ? '#DFE2E2' : 'dark',
			p: 8,
			style: {
				borderInlineEnd: '1px solid #f0f0f0',
			},
		},
		mantineTableProps: {
			withRowBorders: true,
			withColumnBorders: true,
			borderColor: '#f0f0f0',
		},
		...props,
		state: {
			isLoading,
			showProgressBars: isLoading,
			globalFilter: searchContent,
			pagination,
			...props.state,
		},
	});

	return <MantineReactTable table={table} />;
};
