import { IResearch, ISearchResearch } from '@/types/research';
import { query } from '../db';

export async function createResearch(researchModel: IResearch): Promise<any> {
	try {
		const sql = 'CALL InsertResearch(?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			researchModel.research_type_id,
			researchModel.thumbnail,
			researchModel.research_name,
			researchModel.slogan,
			researchModel.description,
			researchModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateResearch(researchModel: IResearch): Promise<any> {
	try {
		const sql = 'CALL UpdateResearch(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			researchModel.research_id,
			researchModel.research_type_id,
			researchModel.thumbnail,
			researchModel.research_name,
			researchModel.slogan,
			researchModel.description,
			researchModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteResearch(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteResearchMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getResearchById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetResearchById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchResearch(search: ISearchResearch): Promise<any[]> {
	try {
		const sql = 'CALL SearchResearch(?, ?, ?, @err_code, @err_msg)';

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

export async function getResearchDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetResearchDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
