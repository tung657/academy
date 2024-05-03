import { IBaseData, IBaseSearch } from './global';

export interface IRole extends IBaseData {
	role_id: number;
	role_name: string;
	role_code: string;
	description: string;
}

export interface ISearchRoles extends IBaseSearch {
	role_name?: string;
	role_code?: string;
	description?: string;
}
