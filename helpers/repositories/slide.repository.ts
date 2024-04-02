import { Database } from '../db';

export async function getSlideByIdRepo(id: string): Promise<any> {
	try {
		const db = new Database();
		const sql = 'CALL GetSlideById(?, @err_code, @err_msg)';
		const [results] = await db.query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
