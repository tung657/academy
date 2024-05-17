import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseResponse } from '@/types';
import { ICV, ISearchCV } from '@/types/cv';

const prefix = '/cvs';

export const searchCV = async (
	params: ISearchCV,
): Promise<IBaseResponse<ICV[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const createCV = async (data: ICV): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const deleteCV = async (data: IBaseDelete): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
