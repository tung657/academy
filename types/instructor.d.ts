import { IBaseData, IBaseSearch } from './global';

export interface IInstructor extends IBaseData {
	instructor_id: number;
	instructor_name: string;
	avatar: string;
	major: string;
	fb_link?: string;
	x_link?: string;
	ins_link?: string;
	linkedin_link?: string;
	sort_order: number;
}

export interface ISearchInstructor extends IBaseSearch {}
