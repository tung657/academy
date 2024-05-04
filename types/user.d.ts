import { IFeatureDataNode } from './feature';
import { IBaseData, IBaseSearch } from './global';

export interface IUser extends IBaseData {
	email: string;
	user_name: string;
	user_id: string;
	employee_id: string;
	date_of_birth: string;
	full_name: string;
	description: string;
	gender: number | string;
	online_flag: number;
	phone_number: string;
	password: string;
	position_id: number | string;
	branch_id: number;
	user_role_id: string;
	role_id: string;
	address: string;

	profile_id: string;
	type: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	avatar: string;
	is_guest: number;
}

export interface ISearchUser extends IBaseSearch {
	user_id?: string;
	employee_id?: string;
	position_id?: string;

	user_name: string;
	full_name: string;
	gender: number;
	date_of_birth: Date;
	email: string;
	phone_number: string;
	description: string;
}

export interface IUserStorage {
	user_id: string;
	user_name: string;
	first_name: string;
	last_name: string;
	full_name: string;
	avatar: string;
	email: string;
	phone_number: string;
	position_id: number;
	position_name: string;
	date_of_birth: string;
	address: string;
	gender?: 0 | 1;
	features?: IFeatureDataNode[];
}

export interface IAdminResetPassword {
	user_id: string;
	lu_user_id: string;
}

export interface IUserResetPassword {
	user_name: string;
	email: string;
}

export interface IUserChangePassword {
	old_password: string;
	new_password: string;
	confirm_new_password: string;
	user_id: string;
	lu_user_id: string;
}
