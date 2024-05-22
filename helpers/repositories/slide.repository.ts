import { ISlide, ISearchSlide } from '@/types/slide';
import { query } from '../db';

export async function createSlide(slideModel: ISlide): Promise<any> {
	try {
		const sql =
			'CALL InsertSlide(?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			slideModel.caption,
			slideModel.btn_label,
			slideModel.btn_to,
			slideModel.big_image,
			slideModel.small_image,
			slideModel.preview_thumbnail,
			slideModel.preview_link,
			slideModel.order,
			slideModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateSlide(slideModel: ISlide): Promise<any> {
	try {
		const sql =
			'CALL UpdateSlide(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			slideModel.slide_id,
			slideModel.caption,
			slideModel.btn_label,
			slideModel.btn_to,
			slideModel.big_image,
			slideModel.small_image,
			slideModel.preview_thumbnail,
			slideModel.preview_link,
			slideModel.order,
			slideModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteSlide(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteSlideMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getSlideById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetSlideById(?, @err_code, @err_msg)';
		const results = await query(sql, [id]);
		return results[0][0];
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchSlide(search: ISearchSlide): Promise<any[]> {
	try {
		const sql = 'CALL SearchSlide(?, ?, ?, @err_code, @err_msg)';

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

export async function getSlideDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetSlideDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
