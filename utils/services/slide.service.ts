import { AxiosRequestConfig } from 'axios';

import { apiClient } from '@/helpers';
import { ISlide } from '@/types/slide';

const prefix = '/slides';

export const getSlideById = async (id: string | number): Promise<ISlide> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const searchSlides = async (
	params: AxiosRequestConfig['params'],
): Promise<any> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const updateSlide = async (data: ISlide): Promise<any> => {
	const res = await apiClient?.put(`${prefix}/update`, data);

	return res.data;
};

export const createSlide = async (data: ISlide): Promise<any> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const deleteSlide = async (id: string | number): Promise<any> => {
	const res = await apiClient?.delete(`${prefix}/delete/${id}`);

	return res.data;
};
