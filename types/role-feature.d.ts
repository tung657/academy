import { IBaseData } from './global';

export interface IRoleFeature extends IBaseData {
	role_function_id: string;
	role_id: string;
	function_id: string;
	description: string;
}

export interface ICreateRoleFeature extends IBaseData {
	role_function_list: [{ role_function_id: string }];
}
