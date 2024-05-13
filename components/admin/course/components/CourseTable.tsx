'use client';

import { Flex, Image } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { CourseModal } from './CourseModal';
import { useSearchCourses } from '@/utils/query-loader/course.loader';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { CourseDelete } from './CourseDelete';
import { ICourse } from '@/types/course';
import { RenderTableParams } from '@/libs/table';

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
				accessorKey: 'avatar', //access nested data with dot notation
				header: t('courses.fields.avatar'),
				size: 100,
				Cell: ({ renderedCellValue, row: { original } }) => (
					<Image
						mah={50}
						fit="contain"
						loading="lazy"
						src={renderedCellValue}
						alt={original.course_name}
					/>
				),
			},
			{
				accessorKey: 'course_name', //access nested data with dot notation
				header: t('courses.fields.course_name'),
				size: 100,
			},
			{
				accessorKey: 'major', //access nested data with dot notation
				header: t('courses.fields.major'),
				size: 100,
			},
			{
				header: t('courses.fields.socials'),
				// Cell: ({ row: { original } }) => (
				// 	<Group justify="center">
				// 		{original.fb_link && (
				// 			<Anchor href={original.fb_link} target="_blank" rel="noopener">
				// 				<ThemeIcon radius={'sm'} color="#e1e1e1" className="icon">
				// 					<IconBrandFacebookFilled
				// 						style={{ width: '70%', height: '70%' }}
				// 						color="#222"
				// 					/>
				// 				</ThemeIcon>
				// 			</Anchor>
				// 		)}
				// 		{original.x_link && (
				// 			<Anchor href={original.x_link} target="_blank" rel="noopener">
				// 				<ThemeIcon radius={'sm'} color="#e1e1e1" className="icon">
				// 					<IconBrandX
				// 						style={{ width: '70%', height: '70%' }}
				// 						color="#222"
				// 					/>
				// 				</ThemeIcon>
				// 			</Anchor>
				// 		)}
				// 		{original.ins_link && (
				// 			<Anchor href={original.fb_link} target="_blank" rel="noopener">
				// 				<ThemeIcon radius={'sm'} color="#e1e1e1" className="icon">
				// 					<IconBrandInstagram
				// 						style={{ width: '70%', height: '70%' }}
				// 						color="#222"
				// 					/>
				// 				</ThemeIcon>
				// 			</Anchor>
				// 		)}
				// 		{original.linkedin_link && (
				// 			<Anchor href={original.fb_link} target="_blank" rel="noopener">
				// 				<ThemeIcon radius={'sm'} color="#e1e1e1" className="icon">
				// 					<IconBrandLinkedin
				// 						style={{ width: '70%', height: '70%' }}
				// 						color="#222"
				// 					/>
				// 				</ThemeIcon>
				// 			</Anchor>
				// 		)}
				// 	</Group>
				// ),
			},
			{
				accessorKey: 'sort_order', //access nested data with dot notation
				header: t('courses.fields.sort_order'),
				mantineTableBodyCellProps: {
					align: 'center',
				},
				size: 50,
			},
			{
				header: t('courses.fields.action'),
				size: 70,
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
			TopAction={<CourseModal />}
		/>
	);
};
