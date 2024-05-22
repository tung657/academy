'use client';

import { Anchor, Flex, Group, Image, Text } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Link } from '@/libs/i18n-navigation';
import { RenderTableParams } from '@/libs/table';
import { ADMIN_INSTRUCTOR_URL } from '@/libs/urls';
import { ICourse } from '@/types/course';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { useSearchCourses } from '@/utils/query-loader/course.loader';

import { CourseDelete } from './CourseDelete';
import { CourseModal } from './CourseModal';

export const CourseTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data: dataCourses, isFetching } = useSearchCourses({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<ICourse>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('courses.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'thumbnail', //access nested data with dot notation
				header: t('courses.fields.thumbnail'),
				size: 100,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ row: { original } }) => (
					<Image
						mah={50}
						fit="contain"
						loading="lazy"
						src={original.thumbnail}
						alt={original.course_name}
					/>
				),
			},
			{
				accessorKey: 'course_name', //access nested data with dot notation
				header: t('courses.fields.course_name'),
				size: 200,
			},
			{
				accessorKey: 'description', //access nested data with dot notation
				header: t('courses.fields.description'),
				size: 300,
				Cell: ({ renderedCellValue }) => (
					<Text title={renderedCellValue?.toString()} truncate="end" maw={500}>
						{renderedCellValue}
					</Text>
				),
			},
			{
				header: t('courses.fields.action'),
				size: 70,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<CourseModal id={original.course_id} />
						<CourseDelete
							label={original.course_name}
							id={original.course_id}
							// path={original.avatar}
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
			data={dataCourses?.data || []}
			totalItems={dataCourses?.totalItems}
			isLoading={isFetching}
			TopAction={
				<Group>
					<CourseModal />
					<Anchor
						component={Link}
						href={ADMIN_INSTRUCTOR_URL}
						target="_blank"
						rel="noopener"
					>
						Đến chuyên gia
					</Anchor>
				</Group>
			}
		/>
	);
};
