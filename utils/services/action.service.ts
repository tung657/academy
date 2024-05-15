import { apiClient } from '@/helpers';
import { IAction, IBaseDelete, IBaseResponse } from '@/types';
import { AxiosRequestConfig } from 'axios';

const prefix = `/actions`;

export const getActionsDropdown = async (): Promise<any[]> => {
	const res = await apiClient?.get(`${prefix}/get-dropdown`);

	return res.data;
};

export const searchActions = async (
	params: AxiosRequestConfig['params'],
): Promise<IBaseResponse<IAction[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getActionDetail = async (
	id: string | number,
): Promise<IAction> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createAction = async (data: IAction): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateAction = async (data: IAction): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const deleteAction = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
