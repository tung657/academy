import { apiClient } from '@/helpers';
import {
	IBaseDelete,
	IBaseDropdown,
	IBaseResponse,
	IPosition,
	ISearchPosition,
} from '@/types';

const prefix = '/positions';

export const getPositionDropdown = async (): Promise<IBaseDropdown> => {
	const res = await apiClient?.get(`${prefix}/dropdown`);

	return res.data;
};

export const searchPosition = async (
	params: ISearchPosition,
): Promise<IBaseResponse<IPosition[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getPositionById = async (
	id: string | number,
): Promise<IPosition> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createPosition = async (
	data: IPosition,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updatePosition = async (
	data: IPosition,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const deletePosition = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
