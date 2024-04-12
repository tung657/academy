import { ButtonProps } from '@mantine/core';

export type LocalePrefix = 'as-needed' | 'always' | 'never';

export interface ButtonCustomProps
	extends Omit<
			React.HTMLProps<HTMLButtonElement>,
			'color' | 'style' | 'size' | 'type' | 'ref'
		>,
		ButtonProps {}

export type NavTree = {
	title: string;
	path: string;
	children?: NavTree[];
};

export interface IBaseDelete {
	list_json: {}[];
	lu_user_id: string;
}

export interface IBaseData {
	active_flag: number;
	created_by_user_id: string;
	created_user: string;
	created_date_time: Date;
	lu_updated: Date;
	lu_user_id: string;
	message?: string;
	success?: boolean;
}

export interface IBaseResponse {
	success: boolean;
	message?: string;
}
