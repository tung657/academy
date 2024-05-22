import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseDropdown, IBaseResponse } from '@/types';
import { IResearch, ISearchResearch } from '@/types/research';

const prefix = '/researches';

export const getResearchDropdown = async (): Promise<IBaseDropdown> => {
	const res = await apiClient?.get(`${prefix}/dropdown`);

	return res.data;
};

export const searchResearch = async (
	params: ISearchResearch,
): Promise<IBaseResponse<IResearch[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getResearchById = async (
	id: string | number,
): Promise<IResearch> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const getResearchByParent = async (
	id: string | number,
): Promise<IBaseResponse<IResearch[]>> => {
	const res = await apiClient?.get(`${prefix}/get-by-parent/${id}`);

	return res.data;
};

export const createResearch = async (
	data: IResearch,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateResearch = async (
	data: IResearch,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const deleteResearch = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
