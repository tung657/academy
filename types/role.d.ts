import { IBaseData } from './global';

export interface IRole extends IBaseData {
	role_id: number;
	role_name: string;
	role_code: string;
	description: string;
}

export interface ISearchRole {
	page_index: number;
	page_size: number;
	search_content: string;
	role_name: string;
	role_code: string;
	description: string;
}
