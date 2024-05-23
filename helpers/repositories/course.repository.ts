import { ICourse, ISearchCourse } from '@/types/course';

import { query } from '../db';

export async function createCourse(courseModel: ICourse): Promise<any> {
	try {
		const sql =
			'CALL InsertCourse(?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			courseModel.course_name,
			courseModel.preview,
			courseModel.description,
			courseModel.thumbnail,
			courseModel.overview,
			courseModel.content,
			courseModel.instructor_id,
			JSON.stringify(courseModel.course_details),
			courseModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateCourse(courseModel: ICourse): Promise<any> {
	try {
		const sql =
			'CALL UpdateCourse(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			courseModel.course_id,
			courseModel.course_name,
			courseModel.preview,
			courseModel.description,
			courseModel.thumbnail,
			courseModel.overview,
			courseModel.content,
			courseModel.instructor_id,
			JSON.stringify(courseModel.course_details),
			courseModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteCourse(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteCourseMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getCourseById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetCourseById(?, @err_code, @err_msg)';
		const results = await query(sql, [id]);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchCourse(search: ISearchCourse): Promise<any[]> {
	try {
		const sql = 'CALL SearchCourse(?, ?, ?, @err_code, @err_msg)';

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

export async function getCourseDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetCourseDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
