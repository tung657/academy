'use client';

import { Center, Flex, Image, Switch } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { RenderTableParams } from '@/libs/table';
import { userState } from '@/store/user/atom';
import { IJob } from '@/types/job';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { intlUSD } from '@/utils/format-number';
import { useSearchJob } from '@/utils/query-loader/job.loader';
import { toggleActiveJob } from '@/utils/services/job.service';

import { JobDelete } from './JobDelete';
import { JobModal } from './JobModal';

export const JobTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';
	const userRecoil = useRecoilValue(userState);

	const { data: dataJobs, isFetching } = useSearchJob({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const handleToggleActive = (checked: boolean, job_id: number) => {
		toggleActiveJob({
			job_id,
			active_flag: Number(checked),
			lu_user_id: userRecoil.user_id,
		} as IJob).then((res) => {
			if (!res.success && res.message) {
				getNotifications('error', t, res.message);
				return;
			}
			getNotifications('success', t, res.message);
		});
	};

	const columns = useMemo<MRT_ColumnDef<IJob>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('jobs.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'icon', //access nested data with dot notation
				header: t('jobs.fields.icon'),
				size: 70,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				enableSorting: false,
				Cell: ({ renderedCellValue, row: { original } }) => (
					<Image
						w={70}
						mah={50}
						fit="contain"
						loading="lazy"
						src={renderedCellValue}
						alt={original.job_name}
					/>
				),
			},
			{
				accessorKey: 'job_name', //access nested data with dot notation
				header: t('jobs.fields.job_name'),
			},
			{
				accessorKey: 'type_time', //access nested data with dot notation
				header: t('jobs.fields.type_time'),
				size: 50,
			},
			{
				accessorKey: 'branch_name', //access nested data with dot notation
				header: t('jobs.fields.address'),
				size: 100,
			},
			{
				accessorKey: 'salary', //access nested data with dot notation
				header: t('jobs.fields.salary'),
				size: 70,
				mantineTableBodyCellProps: {
					align: 'right',
				},
				Cell: ({ renderedCellValue }) =>
					intlUSD.format(Number(renderedCellValue?.toString())),
			},
			{
				header: t('jobs.fields.status'),
				accessorKey: 'active_flag',
				size: 70,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({
					renderedCellValue,
					row: {
						original: { job_id },
					},
				}) => (
					<Center>
						<Switch
							onChange={(event) =>
								handleToggleActive(event.currentTarget.checked, job_id)
							}
							size="md"
							defaultChecked={renderedCellValue ? true : false}
							onLabel="Active"
							offLabel="Not active"
						/>
					</Center>
				),
			},
			{
				header: t('jobs.fields.action'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<JobModal id={original.job_id} />
						<JobDelete
							label={original.job_name}
							id={original.job_id}
							path={original.icon}
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
			data={dataJobs?.data || []}
			totalItems={dataJobs?.totalItems}
			isLoading={isFetching}
			TopAction={<JobModal />}
		/>
	);
};
