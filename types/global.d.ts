import { ButtonProps, OptionsData } from '@mantine/core';

export type LocalePrefix = 'as-needed' | 'always' | 'never';

export interface ButtonCustomProps
	extends Omit<
			React.HTMLProps<HTMLButtonElement>,
			'color' | 'style' | 'size' | 'ref'
		>,
		ButtonProps {
	type?: 'button' | 'submit' | 'reset' | undefined;
}

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
	active_flag?: number;
	created_by_user_id?: string;
	created_user?: string;
	created_date_time?: string;
	lu_updated?: string;
	lu_user_id?: string;
	message?: string;
	success?: boolean;
	RowNumber?: number;
}

export interface IBaseResponse<T = any> {
	message?: string;
	data?: T;
	pageCount?: number;
	totalItems?: number;
	success?: boolean;
}

export interface IBaseSearch {
	page_size?: number;
	page_index?: number;
	search_content?: string;
	user_id?: string;
}

interface IOptionsData {
	label: string;
	value: string;
}

export interface IBaseDropdown extends Array<IOptionsData> {
	message?: string;
	success?: boolean;
}
