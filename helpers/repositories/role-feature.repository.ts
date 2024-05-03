import { ICreateRoleFeature } from '@/types';
import { query } from '../db';

export async function createRoleFeature(
	roleModel: ICreateRoleFeature,
): Promise<any> {
	try {
		const sql = 'CALL InsertRoleFunction(?, ?, @err_code, @err_msg)';
		await query(sql, [
			JSON.stringify(roleModel.role_function_list),
			roleModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
