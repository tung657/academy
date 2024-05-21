import { IBaseData, IBaseSearch } from './global';

export interface ICV extends IBaseData {
	cv_id: number;
	candidate_name: string;
	email: string;
	phone_number: string;
	fb_link?: string;
	position_id?: number;
	position_name?: string;
	cv: string;
}

export interface ISearchCV extends IBaseSearch {}
