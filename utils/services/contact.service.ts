import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseDropdown, IBaseResponse } from '@/types';
import { IContact, ISearchContact } from '@/types/contact';

const prefix = '/contacts';

export const getContactDropdown = async (): Promise<IBaseDropdown> => {
	const res = await apiClient?.get(`${prefix}/dropdown`);

	return res.data;
};

export const searchContact = async (
	params: ISearchContact,
): Promise<IBaseResponse<IContact[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getContactById = async (
	id: string | number,
): Promise<IContact> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createContact = async (data: IContact): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const deleteContact = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
