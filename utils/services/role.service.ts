import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseResponse, IRole, ISearchRoles } from '@/types';
import { OptionsData } from '@mantine/core';

const prefix = '/roles';

export const getRoleDropdown = async (): Promise<OptionsData> => {
	const res = await apiClient?.get(`${prefix}/dropdown`);

	return res.data;
};

export const searchRoles = async (
	params: ISearchRoles,
): Promise<IBaseResponse<IRole[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getRoleById = async (id: string | number): Promise<IRole> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createRole = async (data: IRole): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateRole = async (data: IRole): Promise<IBaseResponse> => {
	const res = await apiClient?.put(`${prefix}/update`, data);

	return res.data;
};

export const deleteRole = async (data: IBaseDelete): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};