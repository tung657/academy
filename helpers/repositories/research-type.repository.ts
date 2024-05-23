import { IResearchType, ISearchResearchType } from '@/types/research-type';

import { query } from '../db';

export async function createResearchType(
	researchTypeModel: IResearchType,
): Promise<any> {
	try {
		const sql = 'CALL InsertResearchType(?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			researchTypeModel.thumbnail,
			researchTypeModel.research_type_name,
			researchTypeModel.slogan,
			researchTypeModel.description,
			researchTypeModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateResearchType(
	researchTypeModel: IResearchType,
): Promise<any> {
	try {
		const sql =
			'CALL UpdateResearchType(?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			researchTypeModel.research_type_id,
			researchTypeModel.thumbnail,
			researchTypeModel.research_type_name,
			researchTypeModel.slogan,
			researchTypeModel.description,
			researchTypeModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteResearchType(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteResearchTypeMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getResearchTypeById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetResearchTypeById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchResearchType(
	search: ISearchResearchType,
): Promise<any[]> {
	try {
		const sql = 'CALL SearchResearchType(?, ?, ?, @err_code, @err_msg)';

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

export async function getResearchTypeDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetResearchTypeDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
