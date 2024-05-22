import { IInstructor, ISearchInstructor } from '@/types/instructor';

import { query } from '../db';

export async function createInstructor(
	instructorModel: IInstructor,
): Promise<any> {
	try {
		const sql =
			'CALL InsertInstructor(?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			instructorModel.instructor_name,
			instructorModel.avatar,
			instructorModel.major,
			instructorModel.fb_link,
			instructorModel.x_link,
			instructorModel.ins_link,
			instructorModel.linkedin_link,
			instructorModel.sort_order,
			instructorModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateInstructor(
	instructorModel: IInstructor,
): Promise<any> {
	try {
		const sql =
			'CALL UpdateInstructor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			instructorModel.instructor_id,
			instructorModel.instructor_name,
			instructorModel.avatar,
			instructorModel.major,
			instructorModel.fb_link,
			instructorModel.x_link,
			instructorModel.ins_link,
			instructorModel.linkedin_link,
			instructorModel.sort_order,
			instructorModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteInstructor(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteInstructorMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getInstructorById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetInstructorById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchInstructor(
	search: ISearchInstructor,
): Promise<any[]> {
	try {
		const sql = 'CALL SearchInstructor(?, ?, ?, @err_code, @err_msg)';

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

export async function getInstructorDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetInstructorDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
