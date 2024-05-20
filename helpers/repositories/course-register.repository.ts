import {
	ICourseRegister,
	ISearchCourseRegister,
} from '@/types/course-register';
import { query } from '../db';

export async function createCourseRegister(
	courseRegisterModel: ICourseRegister,
): Promise<any> {
	try {
		const sql =
			'CALL InsertCourseRegister(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			courseRegisterModel.course_id,
			courseRegisterModel.course_name,
			courseRegisterModel.full_name,
			courseRegisterModel.phone_number,
			courseRegisterModel.email,
			courseRegisterModel.note,
			courseRegisterModel.full_name,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateCourseRegister(
	courseRegisterModel: ICourseRegister,
): Promise<any> {
	try {
		const sql = 'CALL UpdateCourseRegister(?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			courseRegisterModel.course_register_id,
			courseRegisterModel.accept,
			courseRegisterModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteCourseRegister(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteCourseRegisterMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getCourseRegisterById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetCourseRegisterById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchCourseRegister(
	search: ISearchCourseRegister,
): Promise<any[]> {
	try {
		const sql = 'CALL SearchCourseRegister(?, ?, ?, ?, @err_code, @err_msg)';

		const [results] = await query(sql, [
			search.page_index || 0,
			search.page_size || 0,
			search.search_content,
			search.accept,
		]);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getCourseRegisterDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetCourseRegisterDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
