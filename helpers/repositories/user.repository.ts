import { ISearchUser, IUser } from '@/types';
import { query, queryList } from '../db';

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

export async function createEmployee(employee: IUser): Promise<any> {
	try {
		const sql =
			'CALL InsertEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			employee.branch_id,
			employee.employee_id,
			employee.full_name,
			employee.phone_number,
			employee.email,
			employee.position_id,
			employee.password,
			employee.user_id,
			employee.type,
			employee.description,
			employee.is_guest,
			employee.profile_id,
			employee.first_name,
			employee.middle_name,
			employee.last_name,
			employee.avatar,
			employee.gender,
			employee.date_of_birth,
			employee.user_role_id,
			employee.role_id,
			employee.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateEmployee(employee: IUser): Promise<any> {
	try {
		const sql =
			'CALL UpdateEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			employee.user_id,
			employee.employee_id,
			employee.full_name,
			employee.phone_number,
			new Date(employee.date_of_birth),
			employee.branch_id,
			employee.position_id,
			employee.gender,
			employee.email,
			employee.avatar,
			employee.role_id,
			employee.address,
			employee.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteEmployee(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteEmployeeMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getEmployeeById(id: string): Promise<any> {
	try {
		const sql = 'CALL GetEmployeeById(?, @err_code, @err_msg)';
		const [results] = await queryList(sql, [id]);
		return results?.[0];
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getEmployeeDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetEmployeeDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchEmployee(
	employeeSearch: ISearchUser,
): Promise<any> {
	try {
		const sql = 'CALL SearchEmployee(?, ?, ?, @err_code, @err_msg)';
		const [results] = await query(sql, [
			employeeSearch.page_index,
			employeeSearch.page_size,
			employeeSearch.search_content,
			// employeeSearch.user_id,
			// employeeSearch.employee_id,
			// employeeSearch.full_name,
			// employeeSearch.phone_number,
			// employeeSearch.email,
			// employeeSearch.position_id,
		]);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function changePassword(data: any) {
	try {
		const sql = 'CALL ChangePassword(?, ?, ?, ?,@err_code, @err_msg)';
		await query(sql, [
			data.user_id,
			data.old_password,
			data.new_password,
			data.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
export async function resetPassword(user_name: string, new_password: string) {
	try {
		const sql = 'CALL ResetPw(?, ?, @err_code, @err_msg)';
		await query(sql, [user_name, new_password]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function resetPasswordByAdmin(
	user_id: string,
	new_password: string,
	lu_user_id: string,
) {
	try {
		const sql = 'CALL ResetPasswordByAdmin(?, ?, ?, @err_code, @err_msg)';
		var [result] = await query(sql, [user_id, new_password, lu_user_id]);
		if (result.length > 0) {
			var email = result[0].email;
		} else throw new Error('Không tồn tại email');
		return email;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function checkEmployeeEmail(email: string): Promise<any> {
	try {
		const sql = 'CALL CheckEmployeeEmail(?, @err_code, @err_msg)';
		const results = await queryList(sql, [email]);
		return results[0][0]?.id;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
