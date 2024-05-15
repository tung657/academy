import { IBaseData, IBaseSearch } from './global';

export interface IResearch extends IBaseData {
	research_id: number;
	research_type_id: number;
	research_type_name: string;
	thumbnail?: string;
	research_name: string;
	slogan?: string;
	description: string;
}

export interface ISearchResearch extends IBaseSearch {}
