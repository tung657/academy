import { IPosition, ISearchPosition } from '@/types';
import { query } from '../db';

export async function createPosition(positionModel: IPosition): Promise<any> {
	try {
		const sql = 'CALL InsertPosition(?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			positionModel.position_name,
			positionModel.description,
			positionModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updatePosition(positionModel: IPosition): Promise<any> {
	try {
		const sql = 'CALL UpdatePosition(?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			positionModel.position_id,
			positionModel.position_name,
			positionModel.description,
			positionModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deletePosition(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeletePositionMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getPositionById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetPositionById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchPosition(search: ISearchPosition): Promise<any[]> {
	try {
		const sql = 'CALL SearchPosition(?, ?, ?, @err_code, @err_msg)';

		const [results] = await query(sql, [
			search.page_index || 0,
			search.page_size || 0,
			search.search_content,
		]);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getPositionDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetPositionDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
