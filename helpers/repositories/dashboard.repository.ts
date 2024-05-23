import { IBaseSearch } from '@/types';

import { query } from '../db';

export async function statisticCard(): Promise<any> {
	try {
		const sql = 'CALL StatisticCard(@err_code, @err_msg)';
		const results = await query(sql, []);
		if (Array.isArray(results) && results.length > 0) {
			return [results[0][0], results[1][0], results[2][0], results[3][0]];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function statisticBlog(search: IBaseSearch): Promise<any[]> {
	try {
		const sql = 'CALL StatisticBlog(?, ?, ?, @err_code, @err_msg)';

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
