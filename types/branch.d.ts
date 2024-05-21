import { IBaseData, IBaseSearch } from './global';

export interface IBranch extends IBaseData {
	branch_id: string;
	branch_name: string;
	phone?: string;
	address?: string;
	email?: number;
	embed_map?: number;
}

export interface ISearchBranch extends IBaseSearch {}
