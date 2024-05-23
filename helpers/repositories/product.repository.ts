import { IProduct, ISearchProduct } from '@/types/product';

import { query } from '../db';

export async function createProduct(productModel: IProduct): Promise<any> {
	try {
		const sql =
			'CALL InsertProduct(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			productModel.product_name,
			productModel.en_product_name || productModel.product_name,
			productModel.description,
			productModel.en_description || productModel.description,
			productModel.content,
			productModel.en_content || productModel.content,
			productModel.thumbnail,
			productModel.link,
			productModel.slogan,
			productModel.en_slogan || productModel.slogan,
			productModel.sort_order,
			productModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateProduct(productModel: IProduct): Promise<any> {
	try {
		const sql =
			'CALL UpdateProduct(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			productModel.product_id,
			productModel.product_name,
			productModel.en_product_name || productModel.product_name,
			productModel.description,
			productModel.en_description || productModel.description,
			productModel.content,
			productModel.en_content || productModel.content,
			productModel.thumbnail,
			productModel.link,
			productModel.slogan,
			productModel.en_slogan || productModel.slogan,
			productModel.sort_order,
			productModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteProduct(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteProductMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getProductById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetProductById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchProduct(search: ISearchProduct): Promise<any[]> {
	try {
		const sql = 'CALL SearchProduct(?, ?, ?, @err_code, @err_msg)';

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

export async function getProductDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetProductDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
