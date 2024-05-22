'use client';

import { ActionIcon, Anchor, Flex, Tooltip } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSearchCV } from '@/utils/query-loader/cv.loader';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { CVDelete } from './CVDelete';
import { ICV } from '@/types/cv';
import { RenderTableParams } from '@/libs/table';
import { IconDownload } from '@tabler/icons-react';
import { downloadFile } from '@/utils/services/file.service';

export const CVTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';
	const [loading, setLoading] = useState<string | number>();

	const { data: dataCVs, isFetching } = useSearchCV({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<ICV>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('cvs.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'candidate_name', //access nested data with dot notation
				header: t('cvs.fields.candidate_name'),
				size: 100,
			},
			{
				accessorKey: 'job_name', //access nested data with dot notation
				header: t('cvs.fields.position'),
				size: 85,
			},
			{
				accessorKey: 'email', //access nested data with dot notation
				header: t('cvs.fields.email'),
				size: 80,
				Cell: ({ renderedCellValue }) => (
					<Anchor
						href={`mailto:${renderedCellValue?.toString()}`}
						target="_blank"
						rel="noopener"
					>
						{renderedCellValue}
					</Anchor>
				),
			},
			{
				accessorKey: 'phone_number', //access nested data with dot notation
				header: t('cvs.fields.phone_number'),
				size: 85,
				Cell: ({ renderedCellValue }) => (
					<Anchor
						href={`tel:${renderedCellValue?.toString()}`}
						target="_blank"
						rel="noopener"
					>
						{renderedCellValue}
					</Anchor>
				),
			},
			{
				accessorKey: 'fb_link', //access nested data with dot notation
				header: t('cvs.fields.fb_link'),
				size: 110,
				Cell: ({ renderedCellValue }) => (
					<Anchor
						href={renderedCellValue?.toString()}
						target="_blank"
						rel="noopener"
					>
						{renderedCellValue}
					</Anchor>
				),
			},
			{
				header: t('cvs.fields.action'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<Tooltip label={t('global.download')}>
							<ActionIcon
								variant="default"
								c={'blue'}
								loading={loading === original.cv_id}
								onClick={async () => {
									setLoading(original.cv_id);

									await downloadFile(original.cv);

									setLoading(undefined);
								}}
							>
								<IconDownload stroke={1.5} size={20} />
							</ActionIcon>
						</Tooltip>
						<CVDelete label={original.candidate_name} id={original.cv_id} />
					</Flex>
				),
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[t, loading],
	);

	return (
		<RenderTableParams
			columns={columns}
			data={dataCVs?.data || []}
			totalItems={dataCVs?.totalItems}
			isLoading={isFetching}
		/>
	);
};
