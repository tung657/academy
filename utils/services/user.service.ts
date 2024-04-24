import { apiClient } from '@/helpers';
import {
	IBaseDelete,
	IBaseResponse,
	IEmployee,
	ISearchEmployees,
} from '@/types';
import { IUser } from '@/types/user';

const prefix = '/employees';

interface Props {
	user_name: string;
	password: string;
}

export const loginService = async (data: Props): Promise<any> => {
	const res = await apiClient?.post(`/auth/login`, data);

	return res.data;
};

export const authorization = async (): Promise<IBaseResponse> => {
	const res = await apiClient?.get(`${prefix}/me`);

	return res.data;
};

export const getEmployeeById = async (
	id: string | number,
): Promise<IEmployee> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createEmployee = async (data: IUser): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateEmployee = async (data: IUser): Promise<IBaseResponse> => {
	const res = await apiClient?.put(`${prefix}/update`, data);

	return res.data;
};

export const changePasswordEmployee = async (
	data: any,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/change-password`, data);

	return res.data;
};

export const deleteEmployee = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};

export const getNewPw = async (id: string | number): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/new-pw/`, { employee_id: id });

	return res.data;
};

export const searchEmployees = async (
	params: ISearchEmployees,
): Promise<IBaseResponse<IEmployee[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};
