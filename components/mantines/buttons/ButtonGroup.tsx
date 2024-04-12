import { ButtonCustomProps } from '@/types';
import { Button, Tooltip } from '@mantine/core';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react';

interface Props extends ButtonCustomProps {
	tooltip?: boolean;
}

export const ButtonPlus = ({
	tooltip = false,
	...props
}: Props): JSX.Element => {
	return tooltip ? (
		<Tooltip label={'Tạo mới'}>
			<Button variant="outline" color="blue" {...props}>
				<IconPlus stroke={1.7} size={20} />
			</Button>
		</Tooltip>
	) : (
		<Button variant="outline" color="blue" {...props}>
			<IconPlus stroke={1.7} size={20} />
		</Button>
	);
};

export const ButtonEdit = ({
	tooltip = false,
	...props
}: Props): JSX.Element => {
	return tooltip ? (
		<Tooltip label={'Chỉnh sửa'}>
			<Button variant="outline" color="orange" {...props}>
				<IconEdit stroke={1.7} size={20} />
			</Button>
		</Tooltip>
	) : (
		<Button variant="outline" color="orange" {...props}>
			<IconEdit stroke={1.7} size={20} />
		</Button>
	);
};

export const ButtonTrash = ({
	tooltip = false,
	...props
}: Props): JSX.Element => {
	return tooltip ? (
		<Tooltip label={'Xoá'}>
			<Button variant="outline" color="red" {...props}>
				<IconTrash stroke={1.7} size={20} />
			</Button>
		</Tooltip>
	) : (
		<Button variant="outline" color="red" {...props}>
			<IconTrash stroke={1.7} size={20} />
		</Button>
	);
};
