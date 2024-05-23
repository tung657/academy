'use client';

import {
	Avatar,
	Card,
	Flex,
	Group,
	Pagination,
	Table,
	Text,
} from '@mantine/core';
import { useSearchParams } from 'next/navigation';

import { InputSearch } from '@/components/mantines/inputs/InputSearch';
import { TitleRender } from '@/components/mantines/typographies/TitleRender';
import { usePathname, useRouter } from '@/libs/i18n-navigation';
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE } from '@/utils/config';
import { calcTotalPages, intlUSD } from '@/utils/format-number';
import { useStatisticBlog } from '@/utils/query-loader/dashboard.loader';

export const StatisticTable = (): JSX.Element => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const page = searchParams.get(SEARCH_PAGE) || 1;
	const pageSize = searchParams.get(SEARCH_SIZE) || 5;
	const searchContent = searchParams.get(SEARCH_CONTENT) || '';

	const { data } = useStatisticBlog({
		params: {
			page_index: +page,
			page_size: +pageSize,
			search_content: searchContent,
		},
	});

	const handleChangePagination = (page: number, pageSizeNew?: number) => {
		const current = new URLSearchParams(searchParams.toString());

		current.set(SEARCH_PAGE, page.toString());
		pageSizeNew && current.set(SEARCH_SIZE, pageSizeNew.toString());

		router.push(`${pathname}?${current}`);
		router.refresh();
	};

	return (
		<Card mt={16}>
			<Flex align={'center'} justify={'space-between'}>
				<TitleRender order={3} mb={16}>
					Thống kê tin tức
				</TitleRender>

				<InputSearch />
			</Flex>
			<Table highlightOnHover withColumnBorders>
				<Table.Thead>
					<Table.Tr>
						<Table.Th w={50} ta={'center'}>
							STT
						</Table.Th>
						<Table.Th ta={'center'}>Người đăng</Table.Th>
						<Table.Th ta={'center'}>Số bài đăng</Table.Th>
						<Table.Th ta={'center'}>Số lượng xem</Table.Th>
						<Table.Th ta={'center'}>Số phút</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{data?.data?.map((item, index) => (
						<Table.Tr key={item.RowNumber}>
							<Table.Td ta={'center'}>{++index}</Table.Td>
							<Table.Td fw={600}>
								<Group gap={8} align="center">
									<Avatar src={item.avatar} alt={item.created_user} />
									<Text fw={600}>{item.created_user}</Text>
								</Group>
							</Table.Td>
							<Table.Td ta={'right'}>{intlUSD.format(item.total)}</Table.Td>
							<Table.Td ta={'right'}>
								{intlUSD.format(item.total_viewed)}
							</Table.Td>
							<Table.Td ta={'right'}>
								{intlUSD.format(item.total_time)}
							</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>

			<Flex justify={'flex-end'} pt={16}>
				<Pagination
					total={calcTotalPages(pageSize, data?.totalItems || 0)}
					value={+page}
					onChange={handleChangePagination}
					size={'md'}
				/>
			</Flex>
		</Card>
	);
};
