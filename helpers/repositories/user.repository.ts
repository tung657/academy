import { query } from '../db';

export async function authenticateRepository(
	username: string,
	password: string,
): Promise<any> {
	try {
		const sql = 'CALL GetUserByAccount(?, @err_code, @err_msg)';
		const [results] = await query(sql, [username]);
		if (Array.isArray(results) && results.length > 0) {
			let user = results[0];
			if (user.password == password) {
				return user;
			} else {
				return null;
			}
			// return {username: user.customer_name,fullname: user.customer_name};
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
