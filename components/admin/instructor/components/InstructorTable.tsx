'use client';

import { Anchor, Flex, Group, Image, ThemeIcon } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { InstructorModal } from './InstructorModal';
import { useSearchInstructors } from '@/utils/query-loader/instructor.loader';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { InstructorDelete } from './InstructorDelete';
import { IInstructor } from '@/types/instructor';
import { RenderTableParams } from '@/libs/table';
import {
	IconBrandFacebookFilled,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandX,
} from '@tabler/icons-react';

export const InstructorTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data: dataInstructors, isFetching } = useSearchInstructors({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<IInstructor>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('instructors.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'avatar', //access nested data with dot notation
				header: t('instructors.fields.avatar'),
				size: 100,
				Cell: ({ renderedCellValue, row: { original } }) => (
					<Image
						mah={50}
						fit="contain"
						src={renderedCellValue}
						alt={original.instructor_name}
					/>
				),
			},
			{
				accessorKey: 'instructor_name', //access nested data with dot notation
				header: t('instructors.fields.instructor_name'),
				size: 100,
			},
			{
				accessorKey: 'major', //access nested data with dot notation
				header: t('instructors.fields.major'),
				size: 100,
			},
			{
				header: t('instructors.fields.socials'),
				Cell: ({ row: { original } }) => (
					<Group justify="center">
						{original.fb_link && (
							<Anchor href={original.fb_link} target="_blank" rel="noopener">
								<ThemeIcon radius={'sm'} color="#e1e1e1" className="icon">
									<IconBrandFacebookFilled
										style={{ width: '70%', height: '70%' }}
										color="#222"
									/>
								</ThemeIcon>
							</Anchor>
						)}
						{original.x_link && (
							<Anchor href={original.x_link} target="_blank" rel="noopener">
								<ThemeIcon radius={'sm'} color="#e1e1e1" className="icon">
									<IconBrandX
										style={{ width: '70%', height: '70%' }}
										color="#222"
									/>
								</ThemeIcon>
							</Anchor>
						)}
						{original.ins_link && (
							<Anchor href={original.fb_link} target="_blank" rel="noopener">
								<ThemeIcon radius={'sm'} color="#e1e1e1" className="icon">
									<IconBrandInstagram
										style={{ width: '70%', height: '70%' }}
										color="#222"
									/>
								</ThemeIcon>
							</Anchor>
						)}
						{original.linkedin_link && (
							<Anchor href={original.fb_link} target="_blank" rel="noopener">
								<ThemeIcon radius={'sm'} color="#e1e1e1" className="icon">
									<IconBrandLinkedin
										style={{ width: '70%', height: '70%' }}
										color="#222"
									/>
								</ThemeIcon>
							</Anchor>
						)}
					</Group>
				),
			},
			{
				accessorKey: 'sort_order', //access nested data with dot notation
				header: t('instructors.fields.sort_order'),
				mantineTableBodyCellProps: {
					align: 'center',
				},
				size: 50,
			},
			{
				header: t('instructors.fields.action'),
				size: 70,
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<InstructorModal id={original.instructor_id} />
						<InstructorDelete
							label={original.instructor_name}
							id={original.instructor_id}
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
			data={dataInstructors?.data || []}
			totalItems={dataInstructors?.totalItems}
			isLoading={isFetching}
			TopAction={<InstructorModal />}
		/>
	);
};