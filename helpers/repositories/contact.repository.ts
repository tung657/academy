import { IContact, ISearchContact } from '@/types/contact';
import { query } from '../db';

export async function createContact(contactModel: IContact): Promise<any> {
	try {
		const sql = 'CALL InsertContact(?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			contactModel.customer_name,
			contactModel.email,
			contactModel.phone_number,
			contactModel.message,
			contactModel.customer_name,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateContact(contactModel: IContact): Promise<any> {
	try {
		const sql = 'CALL UpdateContact(?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			contactModel.contact_id,
			contactModel.customer_name,
			contactModel.email,
			contactModel.phone_number,
			contactModel.message,
			contactModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteContact(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteContactMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getContactById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetContactById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchContact(search: ISearchContact): Promise<any[]> {
	try {
		const sql = 'CALL SearchContact(?, ?, ?, @err_code, @err_msg)';

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

export async function getContactDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetContactDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
