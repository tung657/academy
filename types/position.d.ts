import { IBaseData, IBaseSearch } from './global';

export interface IPosition extends IBaseData {
	position_id: number;
	position_name: string;
	description: string;
}

export interface ISearchPosition extends IBaseSearch {}
