import { Button, Tooltip } from '@mantine/core';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react';

import { ButtonCustomProps } from '@/types';

interface Props extends ButtonCustomProps {
	tooltip?: boolean;
}

export const ButtonPlus = ({
	tooltip = false,
	...props
}: Props): JSX.Element => {
	return tooltip ? (
		<Tooltip label={'Tạo mới'}>
			<Button bg={'white'} variant="outline" color="blue" {...props}>
				<IconPlus stroke={1.7} size={20} />
			</Button>
		</Tooltip>
	) : (
		<Button bg={'white'} variant="outline" color="blue" {...props}>
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
			<Button bg={'white'} variant="outline" color="orange" {...props}>
				<IconEdit stroke={1.7} size={20} />
			</Button>
		</Tooltip>
	) : (
		<Button bg={'white'} variant="outline" color="orange" {...props}>
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
			<Button bg={'white'} variant="outline" color="red" {...props}>
				<IconTrash stroke={1.7} size={20} />
			</Button>
		</Tooltip>
	) : (
		<Button bg={'white'} variant="outline" color="red" {...props}>
			<IconTrash stroke={1.7} size={20} />
		</Button>
	);
};
