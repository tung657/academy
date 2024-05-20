'use client';

import { Anchor, Flex, SegmentedControl, Text, Tooltip } from '@mantine/core';

import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {
	CACHE_COURSE_REGISTER,
	useSearchCourseRegister,
	useUpdateCourseRegister,
} from '@/utils/query-loader/course-register.loader';
import {
	SEARCH_BRANCH,
	SEARCH_CONTENT,
	SEARCH_PAGE,
	SEARCH_SIZE,
} from '@/utils/config';

import { RenderTableParams } from '@/libs/table';
import { ICourseRegister } from '@/types/course-register';
import { CourseRegisterDelete } from './CourseRegisterDelete';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { queryClient } from '@/utils/query-loader/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user/atom';
import { SelectRender } from '@/components/mantines/inputs/SelectRender';
import { usePathname, useRouter } from '@/libs/i18n-navigation';

const acceptDropdown = [
	{
		label: 'Từ chối',
		value: '-1',
	},
	{
		label: 'Đang duyệt',
		value: '0',
	},
	{
		label: 'Đồng ý',
		value: '1',
	},
];

export const CourseRegisterTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';
	const accept = searchParams.get(SEARCH_BRANCH);
	const userRecoil = useRecoilValue(userState);

	const { data: dataCourseRegisters, isLoading } = useSearchCourseRegister({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
			accept: accept || null,
		},
	});

	const updateQuery = useUpdateCourseRegister({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);
					return;
				}
				queryClient.invalidateQueries([CACHE_COURSE_REGISTER.SEARCH]);
				getNotifications('success', t, data.message);
			},
		},
	});

	const columns = useMemo<MRT_ColumnDef<ICourseRegister>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('course-registers.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'full_name', //access nested data with dot notation
				header: t('course-registers.fields.full_name'),
			},
			{
				accessorKey: 'course_name', //access nested data with dot notation
				header: t('course-registers.fields.course_name'),
				size: 100,
			},
			{
				accessorKey: 'phone_number', //access nested data with dot notation
				header: t('course-registers.fields.phone_number'),
				size: 100,
				Cell: ({ renderedCellValue }) => (
					<Anchor href={`tel:${renderedCellValue?.toString()}`}>
						{renderedCellValue}
					</Anchor>
				),
			},
			{
				accessorKey: 'email', //access nested data with dot notation
				header: t('course-registers.fields.email'),
				size: 100,
				Cell: ({ renderedCellValue }) => (
					<Anchor href={`mailto:${renderedCellValue?.toString()}`}>
						{renderedCellValue}
					</Anchor>
				),
			},
			{
				accessorKey: 'note', //access nested data with dot notation
				header: t('course-registers.fields.note'),
				size: 200,
				Cell: ({ renderedCellValue }) => (
					<Tooltip label={renderedCellValue}>
						<Text truncate="end" maw={200}>
							{renderedCellValue}
						</Text>
					</Tooltip>
				),
			},
			{
				header: t('course-registers.fields.accept'),
				accessorKey: 'accept',
				// enableSorting: false,
				size: 200,
				mantineTableBodyCellProps: { align: 'center' },
				Cell: ({ row: { original } }) => {
					const getColor = (value: number) => {
						switch (value) {
							case -1:
								return 'red';
							case 1:
								return 'green';
							default:
								return 'orange';
						}
					};

					return (
						<SegmentedControl
							onChange={(value) =>
								updateQuery.mutate({
									course_register_id: original.course_register_id,
									accept: +value,
									lu_user_id: userRecoil.user_id,
								} as ICourseRegister)
							}
							defaultValue={original.accept.toString()}
							color={getColor(original.accept)}
							data={acceptDropdown}
						/>
					);
				},
			},
			{
				header: t('course-registers.fields.action'),
				size: 70,
				mantineTableBodyCellProps: { align: 'center' },
				Cell: ({ row: { original } }) => (
					<Flex gap={8}>
						<CourseRegisterDelete
							label={original.full_name + ' đăng ký ' + original.course_name}
							id={original.course_register_id}
						/>
					</Flex>
				),
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[t],
	);

	return (
		<RenderTableParams
			columns={columns}
			data={dataCourseRegisters?.data || []}
			totalItems={dataCourseRegisters?.totalItems}
			isLoading={isLoading}
			TopAction={<DropdownAccept />}
		/>
	);
};

function DropdownAccept() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const accept = searchParams.get(SEARCH_BRANCH) || '';

	return (
		<SelectRender
			defaultValue={accept}
			data={[{ label: 'Tất cả', value: '' }, ...acceptDropdown]}
			onChange={(value) => {
				const current = new URLSearchParams(searchParams.toString());

				current.set(SEARCH_PAGE, '1');
				current.set(SEARCH_BRANCH, value || '');

				router.push(`${pathname}?${current}`);
				router.refresh();
			}}
		/>
	);
}
