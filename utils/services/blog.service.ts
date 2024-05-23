import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseResponse } from '@/types';
import { IBlog, ISearchBlog } from '@/types/blog';

const prefix = '/blogs';

export const searchBlog = async (
	params: ISearchBlog,
): Promise<IBaseResponse<IBlog[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getBlogById = async (id: string | number): Promise<IBlog> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createBlog = async (data: IBlog): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateBlog = async (data: IBlog): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const updateViewBlog = async (data: IBlog): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update-view`, data);

	return res.data;
};

export const deleteBlog = async (data: IBaseDelete): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
