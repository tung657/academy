import { IBaseData, IBaseSearch } from './global';

export interface IEmployee extends IBaseData {
	employee_id: string;
	full_name: string;
	phone_number: string;
	email: string;
	position_id: number;
	branch_id: number;
	active_flag: number;
	created_by_user_id: string;
	created_date_time: Date;
	lu_updated: Date;
	lu_user_id: string;

	// system user
	user_id: string;
	password: string;
	user_name: string;
	type: string;
	description: string;
	online_flag: boolean;
	is_guest: boolean;
	// user profile
	profile_id: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	avatar: string;
	gender: number;
	date_of_birth: string;

	// user_roles
	user_role_id: string;
	role_id: string;
}

export interface ISearchEmployees extends IBaseSearch {}
