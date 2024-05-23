'use client';

import { Anchor, Flex, Image } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { RenderTableParams } from '@/libs/table';
import { ISlide } from '@/types';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { useSearchSlide } from '@/utils/query-loader/slide.loader';

import { SlideDelete } from './SlideDelete';
import { SlideModal } from './SlideModal';

export const SlideTable = (): JSX.Element => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 10;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data: dataSlides, isFetching } = useSearchSlide({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const columns = useMemo<MRT_ColumnDef<ISlide>[]>(
		() => [
			{
				accessorKey: 'serial', //access nested data with dot notation
				header: t('slides.fields.serial'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ renderedRowIndex }) =>
					renderedRowIndex ? ++renderedRowIndex : 1,
			},
			{
				accessorKey: 'big_image', //access nested data with dot notation
				header: t('slides.fields.big_image'),
				size: 70,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				enableSorting: false,
				Cell: ({ row: { original } }) => (
					<Image
						w={70}
						mah={50}
						fit="contain"
						loading="lazy"
						src={original.big_image}
						alt={'slide ' + original.slide_id}
					/>
				),
			},
			{
				accessorKey: 'small_image', //access nested data with dot notation
				header: t('slides.fields.small_image'),
				size: 70,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				enableSorting: false,
				Cell: ({ row: { original } }) => (
					<Image
						w={70}
						mah={50}
						fit="contain"
						loading="lazy"
						src={original.small_image}
						alt={'slide ' + original.slide_id}
					/>
				),
			},
			{
				header: t('slides.fields.preview'),
				size: 70,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				enableSorting: false,
				Cell: ({ row: { original } }) => (
					<Anchor href={original.preview_link} target="_blank" rel="noopener">
						<Image
							w={70}
							mah={50}
							fit="contain"
							loading="lazy"
							src={original.preview_thumbnail}
							alt={'slide ' + original.slide_id}
						/>
					</Anchor>
				),
			},
			{
				accessorKey: 'btn_label', //access nested data with dot notation
				header: t('slides.fields.btn_label'),
				size: 100,
				Cell: ({
					renderedCellValue,
					row: {
						original: { btn_to },
					},
				}) => (
					<Anchor href={btn_to} target="_blank" rel="reopener">
						{renderedCellValue}
					</Anchor>
				),
			},
			{
				accessorKey: 'order', //access nested data with dot notation
				header: t('slides.fields.order'),
				mantineTableBodyCellProps: {
					align: 'center',
				},
				size: 15,
			},
			{
				header: t('slides.fields.action'),
				size: 50,
				mantineTableBodyCellProps: {
					align: 'center',
				},
				Cell: ({ row: { original } }) => (
					<Flex justify={'center'} gap={8}>
						<SlideModal id={original.slide_id} />
						<SlideDelete
							label={original.slide_id + ''}
							id={original.slide_id}
							path={[
								original.big_image,
								original?.small_image + '',
								original?.preview_thumbnail + '',
							]}
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
			data={dataSlides?.data || []}
			totalItems={dataSlides?.totalItems}
			isLoading={isFetching}
			TopAction={<SlideModal />}
		/>
	);
};
