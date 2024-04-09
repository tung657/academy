import { apiClient } from '@/helpers';
import { IBaseDelete } from '@/types/global';
import { IUser } from '@/types/user';
import { AxiosRequestConfig } from 'axios';

const prefix = '/users';

interface Props {
	user_name: string;
	password: string;
}

export const loginService = async (data: Props): Promise<any> => {
	const res = await apiClient?.post(`/auth/login`, data);

	return res.data;
};

export const authorization = async (): Promise<any> => {
	const res = await apiClient?.get(`${prefix}/me`);

	return res.data;
};

export const getEmployeeById = async (id: string | number): Promise<any> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createEmployee = async (data: IUser): Promise<any> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateEmployee = async (data: IUser): Promise<any> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const changePasswordEmployee = async (data: any): Promise<any> => {
	const res = await apiClient?.post(`${prefix}/change-password`, data);

	return res.data;
};

export const deleteEmployee = async (data: IBaseDelete): Promise<any> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};

export const getNewPw = async (token: string) => {
	const res = await apiClient?.get(`${prefix}/new-pw/` + token);

	return res.data;
};

export const searchEmployees = async (
	params: AxiosRequestConfig['params'],
): Promise<any> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};
