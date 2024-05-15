import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseResponse } from '@/types';
import { IProduct, ISearchProduct } from '@/types/product';
import { OptionsData } from '@mantine/core';

const prefix = '/products';

export const getProductDropdown = async (): Promise<OptionsData> => {
	const res = await apiClient?.get(`${prefix}/dropdown`);

	return res.data;
};

export const searchProduct = async (
	params: ISearchProduct,
): Promise<IBaseResponse<IProduct[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getProductById = async (
	id: string | number,
): Promise<IProduct> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createProduct = async (data: IProduct): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateProduct = async (data: IProduct): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const deleteProduct = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
