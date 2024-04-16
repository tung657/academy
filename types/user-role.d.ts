import { IBaseData } from './global';

export interface IUserRole extends IBaseData {
	user_role_id: string;
	user_id: string;
	role_id: string;
	active_flag: number;
	created_by_user_id: string;
	created_date_time: Date;
	lu_updated: Date;
	lu_user_id: string;
}

export interface IDeleteUserRoleModel {
	user_id: string;
	role_id: string;
	lu_user_id: string;
}
