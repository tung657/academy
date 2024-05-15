import { IBaseData, IBaseSearch } from './global';

export interface IResearchType extends IBaseData {
	research_type_id: number;
	thumbnail?: string;
	research_type_name: string;
	slogan?: string;
	description: string;
}

export interface ISearchResearchType extends IBaseSearch {}
