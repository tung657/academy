import { IBaseData, IBaseSearch } from './global';

export interface IBranch extends IBaseData {
	branch_id?: number;
	branch_name: string;
	phone?: string;
	address?: string;
	email?: number;
	embed_map?: number;
}

export interface ISearchBranches extends IBaseSearch {}
