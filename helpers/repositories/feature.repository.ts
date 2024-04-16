import { IFeature, ISearchFeatures } from '@/types/feature';
import { query } from '../db';

export async function createFeatureRepository(
	functionModel: IFeature,
): Promise<any> {
	try {
		const sql = 'CALL InsertFunction(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			functionModel.parent_id,
			functionModel.function_name,
			functionModel.url,
			functionModel.description,
			functionModel.sort_order,
			functionModel.level,
			functionModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateFeatureRepository(func: IFeature): Promise<any> {
	try {
		const sql =
			'CALL UpdateFunction(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			func.function_id,
			func.parent_id,
			func.function_name,
			func.url,
			func.description,
			func.sort_order,
			func.level,
			func.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteFeatureRepository(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteFunctionMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getFeatureByIdRepository(id: number): Promise<any> {
	try {
		const sql = 'CALL GetFunctionById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchFeatureRepository(
	search: ISearchFeatures,
): Promise<any[]> {
	try {
		const sql = 'CALL SearchFunctions(?, ?, ?, ?, ?, @err_code, @err_msg)';

		const [results] = await query(sql, [
			search.page_index || 0,
			search.page_size || 0,
			search.search_content,
			search.function_id,
			search.parent_id,
		]);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getFeaturesByRolesIdRepository(role_id: string) {
	try {
		const sql = 'CALL GetActiveFunctionByRoleId(?, @err_code, @err_msg)';
		const [results] = await query(sql, [role_id]);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getFunctionByUserIdRepository(
	id: string,
): Promise<any[]> {
	try {
		const sql = 'CALL GetFunctionByUserId(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
