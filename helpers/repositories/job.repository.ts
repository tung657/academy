import { IJob, ISearchJob } from '@/types/job';
import { query } from '../db';

export async function createJob(jobModel: IJob): Promise<any> {
	try {
		const sql = 'CALL InsertJob(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			jobModel.job_name,
			jobModel.icon,
			jobModel.type_time,
			jobModel.address,
			jobModel.salary,
			jobModel.job_description,
			jobModel.created_by_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function updateJob(jobModel: IJob): Promise<any> {
	try {
		const sql = 'CALL UpdateJob(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			jobModel.job_id,
			jobModel.job_name,
			jobModel.icon,
			jobModel.type_time,
			jobModel.address,
			jobModel.salary,
			jobModel.job_description,
			jobModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function toggleActiveJob(jobModel: IJob): Promise<any> {
	try {
		const sql = 'CALL ToggleActiveJob(?, ?, ?, @err_code, @err_msg)';
		await query(sql, [
			jobModel.job_id,
			jobModel.active_flag,
			jobModel.lu_user_id,
		]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function deleteJob(
	list_json: any,
	lu_user_id: string,
): Promise<any> {
	try {
		const sql = 'CALL DeleteJobMulti(?, ?, @err_code, @err_msg)';
		await query(sql, [JSON.stringify(list_json), lu_user_id]);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getJobById(id: number): Promise<any> {
	try {
		const sql = 'CALL GetJobById(?, @err_code, @err_msg)';
		const [results] = await query(sql, [id]);
		if (Array.isArray(results) && results.length > 0) {
			return results[0];
		}
		return null;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function searchJob(search: ISearchJob): Promise<any[]> {
	try {
		const sql = 'CALL SearchJob(?, ?, ?, ?, @err_code, @err_msg)';

		const [results] = await query(sql, [
			search.page_index || 0,
			search.page_size || 0,
			search.search_content,
			search.active_flag,
		]);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function getJobDropdown(): Promise<any> {
	try {
		const sql = 'CALL GetJobDropdown(@err_code, @err_msg)';
		const [results] = await query(sql, []);
		return results;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
