import { IBaseData, IBaseSearch } from './global';

export interface IJob extends IBaseData {
	job_id: number;
	job_name: string;
	icon: string;
	type_time: string;
	address: string;
	branch_name: string;
	salary: string;
	job_description: string;
}

export interface ISearchJob extends IBaseSearch {
	active_flag?: 0 | 1;
}
