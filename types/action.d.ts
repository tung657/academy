import { IBaseData } from './global';

export interface IAction extends IBaseData {
	action_code: string;
	function_id: string;
	action_name: string;
	description: string;
}

export interface ISearchAction {
	page_index?: number;
	page_size?: number;
	search_content?: string;
	function_id?: number;
	action_code?: string;
	action_name?: string;
	description?: string;
}
