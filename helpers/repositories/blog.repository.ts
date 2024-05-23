import { IBlog, ISearchBlog } from '@/types/blog';

import { query } from '../db';

export async function createBlog(partnerModel: IBlog): Promise<any> {
	try {
		const sql = 'CALL InsertBlog(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			partnerModel.title,
			partnerModel.thumbnail,
			partnerModel.content,
			partnerModel.meta_content,
			partnerModel.read_time,
			partnerModel.topic_id,
			partnerModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateBlog(partnerModel: IBlog): Promise<any> {
	try {
		const sql = 'CALL UpdateBlog(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			partnerModel.blog_id,
			partnerModel.title,
			partnerModel.thumbnail,
			partnerModel.content,
			partnerModel.meta_content,
			partnerModel.read_time,
			partnerModel.topic_id,
			partnerModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteBlog(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteBlogMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getBlogById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetBlogById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchBlog(search: ISearchBlog): Promise<any[]> {
	try {
		const sql = 'CALL SearchBlog(?, ?, ?, ?, @err_code, @err_msg)';

		const [results] = await query(sql, [
			search.page_index || 0,
			search.page_size || 0,
			search.search_content,
			search.topic_id,
		]);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateViewBlog(partnerModel: IBlog): Promise<any> {
	try {
		const sql = 'CALL UpdateViewBlog(?,  @err_code, @err_msg)';
		await query(sql, [partnerModel.blog_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
