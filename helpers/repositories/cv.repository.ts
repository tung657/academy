import { ICV, ISearchCV } from '@/types/cv';
import { query } from '../db';

export async function createCV(cvModel: ICV): Promise<any> {
	try {
		const sql = 'CALL InsertCV(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			cvModel.candidate_name,
			cvModel.email,
			cvModel.phone_number,
			cvModel.fb_link,
			cvModel.position_id,
			cvModel.cv,
			cvModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateCV(cvModel: ICV): Promise<any> {
	try {
		const sql = 'CALL UpdateCV(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			cvModel.cv_id,
			cvModel.candidate_name,
			cvModel.email,
			cvModel.phone_number,
			cvModel.fb_link,
			cvModel.position_id,
			cvModel.cv,
			cvModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteCV(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteCVMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getCVById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetCVById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchCV(search: ISearchCV): Promise<any[]> {
	try {
		const sql = 'CALL SearchCV(?, ?, ?, @err_code, @err_msg)';

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

export async function getCVDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetCVDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
