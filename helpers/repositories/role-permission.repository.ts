import { query } from '../db';

export async function createRolePermission(
	role_permission_list: any,
	created_by_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL InsertRolePermission(?, ?, @err_code, @err_msg)';
		let listString = JSON.stringify(role_permission_list);
		await query(sql, [listString, created_by_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteRolePermission(
	list_json: any,
	updated_by_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteRolePermission(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), updated_by_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getRolePermission(
	role_id: string,
	function_id: string,
): Promise<any> {
	try {
		const sql = 'CALL GetActiveRolePermission(?, ?, @err_code, @err_msg)';
		const [result] = await query(sql, [role_id, function_id]);
		return result;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
