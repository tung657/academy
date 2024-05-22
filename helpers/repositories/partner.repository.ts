import { IPartner, ISearchPartner } from '@/types/partner';

import { query } from '../db';

export async function createPartner(partnerModel: IPartner): Promise<any> {
	try {
		const sql = 'CALL InsertPartner(?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			partnerModel.partner_name,
			partnerModel.thumbnail,
			partnerModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updatePartner(partnerModel: IPartner): Promise<any> {
	try {
		const sql = 'CALL UpdatePartner(?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			partnerModel.partner_id,
			partnerModel.partner_name,
			partnerModel.thumbnail,
			partnerModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deletePartner(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeletePartnerMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getPartnerById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetPartnerById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchPartner(search: ISearchPartner): Promise<any[]> {
	try {
		const sql = 'CALL SearchPartner(?, ?, ?, @err_code, @err_msg)';

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

export async function getPartnerDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetPartnerDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
