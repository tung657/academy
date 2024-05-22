import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseResponse } from '@/types';
import { IPartner, ISearchPartner } from '@/types/partner';

const prefix = '/partners';

export const searchPartner = async (
	params: ISearchPartner,
): Promise<IBaseResponse<IPartner[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getPartnerById = async (
	id: string | number,
): Promise<IPartner> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createPartner = async (data: IPartner): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updatePartner = async (data: IPartner): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const deletePartner = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
