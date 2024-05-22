import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseDropdown, IBaseResponse } from '@/types';
import { IResearchType, ISearchResearchType } from '@/types/research-type';

const prefix = '/research-types';

export const getResearchTypeDropdown = async (): Promise<IBaseDropdown> => {
	const res = await apiClient?.get(`${prefix}/dropdown`);

	return res.data;
};

export const searchResearchType = async (
	params: ISearchResearchType,
): Promise<IBaseResponse<IResearchType[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getResearchTypeById = async (
	id: string | number,
): Promise<IResearchType> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createResearchType = async (
	data: IResearchType,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateResearchType = async (
	data: IResearchType,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const deleteResearchType = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
