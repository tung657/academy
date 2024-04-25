import { IBranch, ISearchBranches } from '@/types/branch';
import { query } from '../db';

export async function createBranch(branchModel: IBranch): Promise<any> {
	try {
		const sql = 'CALL InsertBranch(?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			branchModel.branch_name,
			branchModel.phone,
			branchModel.address,
			branchModel.email,
			branchModel.embed_map,
			branchModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateBranch(func: IBranch): Promise<any> {
	try {
		const sql = 'CALL UpdateBranch(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			func.branch_id,
			func.branch_name,
			func.phone,
			func.address,
			func.email,
			func.embed_map,
			func.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteBranch(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteBranchMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getBranchById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetBranchById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchBranch(search: ISearchBranches): Promise<any[]> {
	try {
		const sql = 'CALL SearchBranches(?, ?, ?, ?, ?, @err_code, @err_msg)';

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

export async function getBranchDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetBranchDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
