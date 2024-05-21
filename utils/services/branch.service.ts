import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseDropdown, IBaseResponse } from '@/types';
import { IBranch, ISearchBranch } from '@/types/branch';

const prefix = '/branches';

export const getBranchDropdown = async (): Promise<IBaseDropdown> => {
	const res = await apiClient?.get(`${prefix}/dropdown`);

	return res.data;
};

export const searchBranch = async (
	params: ISearchBranch,
): Promise<IBaseResponse<IBranch[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getBranchById = async (id: string | number): Promise<IBranch> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createBranch = async (data: IBranch): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateBranch = async (data: IBranch): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const deleteBranch = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
