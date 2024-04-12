import { IAction, ISearchAction } from '@/types';
import { query } from '../db';

export async function createActionRepository(action: IAction): Promise<any> {
	try {
		const sql = 'CALL InsertAction(?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			action.action_code,
			action.function_id,
			action.action_name,
			action.description,
			action.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateActionRepository(action: IAction): Promise<any> {
	try {
		const sql = 'CALL UpdateAction(?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			action.action_code,
			action.function_id,
			action.action_name,
			action.description,
			action.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteActionRepository(
	list_json: any,
	updated_by_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteAction(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), updated_by_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getActionByIdRepository(id: string): Promise<any> {
	try {
		const sql = 'CALL GetActionById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchActionRepository(
	model: ISearchAction,
): Promise<any[]> {
	try {
		const sql = 'CALL SearchAction(?, ?, ?, ?, ?, ?, ?,@err_code, @err_msg)';
		const [results] = await query(sql, [
			model.page_index,
			model.page_size,
			model.search_content,
			model.function_id,
			model.action_code,
			model.action_name,
			model.description,
		]);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
