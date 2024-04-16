import { query } from '../db';

export async function getSlideByIdRepo(id: string): Promise<any> {
	try {
		const sql = 'CALL GetSlideById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
