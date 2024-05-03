import { IRole, ISearchRoles } from '@/types';
import { query } from '../db';

export async function createRole(roleModel: IRole): Promise<any> {
	try {
		const sql = 'CALL InsertRole(?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			roleModel.role_code,
			roleModel.role_name,
			roleModel.description,
			roleModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateRole(roleModel: IRole): Promise<any> {
	try {
		const sql = 'CALL UpdateRole(?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			roleModel.role_id,
			roleModel.role_name,
			roleModel.description,
			roleModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteRole(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteRoleMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getRoleById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetRoleById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchRole(search: ISearchRoles): Promise<any[]> {
	try {
		const sql = 'CALL SearchRole(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';

		const [results] = await query(sql, [
			search.page_index || 0,
			search.page_size || 0,
			search.search_content,
			null,
			null,
			null,
			null,
		]);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getRoleDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetRoleDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
