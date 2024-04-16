import React, { useState } from 'react';
import {
	Table,
	ScrollArea,
	UnstyledButton,
	Group,
	Text,
	Center,
	rem,
	Stack,
} from '@mantine/core';
import { IconSelector, IconPackage } from '@tabler/icons-react';
import classes from './scss/table-render.module.scss';
import { useTranslations } from 'next-intl';

interface ThProps {
	children: React.ReactNode;
	sorter?: () => void;
}

function Th({ children, sorter }: ThProps) {
	// const Icon = sorter
	// 	? sorter
	// 		? IconChevronUp
	// 		: IconChevronDown
	// 	: IconSelector;
	const Icon = IconSelector;
	return (
		<Table.Th className={classes.th}>
			<UnstyledButton className={classes.control}>
				<Group justify={sorter ? 'space-between' : 'center'}>
					{sorter && <div></div>}
					<Text fw={700} fz="md">
						{children}
					</Text>
					{sorter && (
						<Center className={classes.icon} onClick={sorter}>
							<Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
						</Center>
					)}
				</Group>
			</UnstyledButton>
		</Table.Th>
	);
}

export interface IColumnsTable<T> {
	title: React.ReactNode;
	dataIndex?: string;
	textAlign?: AlignSetting;
	sorter?: (a: T, b: T) => number;
	render: (value: string, record?: T) => React.ReactNode;
}

export interface ITableCustomProps {
	columns: IColumnsTable<any>[];
	dataSource: any[];
}

export function TableRender({ columns, dataSource }: ITableCustomProps) {
	const [dataSorted, setDataSorted] = useState(dataSource);
	const [sortBy, setSortBy] = useState<any | null>(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);
	const t = useTranslations();

	const rows = dataSorted.map((row, index) => (
		<Table.Tr key={index}>
			{columns.map((column, index) => (
				<Table.Td key={index} ta={column.textAlign || 'left'}>
					{column.render
						? column.render(row[column.dataIndex || ''], row)
						: row[column.dataIndex || '']}
				</Table.Td>
			))}
		</Table.Tr>
	));

	const handleSort = (sorter: any, field: any) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);

		const cloneData = JSON.parse(JSON.stringify(dataSource));
		const dataSorted = cloneData.sort(sorter);

		setDataSorted(dataSorted);
	};

	return (
		<ScrollArea>
			{/* <TextInput
				placeholder="Search by any field"
				mb="md"
				leftSection={
					<IconSearch
						style={{ width: rem(16), height: rem(16) }}
						stroke={1.5}
					/>
				}
				value={search}
				onChange={handleSearchChange}
			/> */}
			<Table
				horizontalSpacing="md"
				verticalSpacing="xs"
				layout="fixed"
				highlightOnHover
			>
				<Table.Tbody>
					<Table.Tr bg={'gray.0'}>
						{columns.map((item, index) => (
							<Th
								key={index}
								sorter={
									item.sorter
										? () => handleSort(item.sorter, item.dataIndex)
										: undefined
								}
							>
								{item.title}
							</Th>
						))}
					</Table.Tr>
				</Table.Tbody>
				{rows.length > 0 ? (
					<Table.Tbody>{rows}</Table.Tbody>
				) : (
					<Table.Tr>
						<Table.Td colSpan={columns?.length}>
							<Stack mih={300} align="center" w={'100%'}>
								<IconPackage size={200} stroke={0.3} />
								<Text fw={600}>{t('global.no_data')}</Text>
							</Stack>
						</Table.Td>
					</Table.Tr>
				)}
			</Table>
		</ScrollArea>
	);
}
