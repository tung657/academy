import { IBaseData, IBaseSearch } from './global';

export interface ICourseRegister extends IBaseData {
	course_register_id: number;
	course_id: number;
	course_name: string;
	full_name: string;
	phone_number: string;
	email: string;
	note?: string;
	accept: -1 | 0 | 1;
}

export interface ISearchCourseRegister extends IBaseSearch {
	accept: -1 | 0 | 1;
}
