import { IBaseData, IBaseSearch } from './global';

export interface IAction extends IBaseData {
	action_code: string;
	function_id: string;
	action_name: string;
	description: string;
}

export interface ISearchAction extends IBaseSearch {
	function_id?: number;
	action_code?: string;
	action_name?: string;
	description?: string;
}
