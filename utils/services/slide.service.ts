import { AxiosRequestConfig } from 'axios';

import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseResponse } from '@/types';
import { ISlide } from '@/types/slide';

const prefix = '/slides';

export const getSlideById = async (id: string | number): Promise<ISlide> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const searchSlide = async (
	params: AxiosRequestConfig['params'],
): Promise<IBaseResponse<ISlide[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const updateSlide = async (data: ISlide): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const createSlide = async (data: ISlide): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const deleteSlide = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
