import { apiClient } from '@/helpers';
import { getFeatureByIdRepository } from '@/helpers/repositories/feature.repository';
import { IBaseDelete, IBaseResponse, IFeature } from '@/types';
import { AxiosRequestConfig } from 'axios';

const prefix = '/features';

export const getFeaturesDropdown = async (): Promise<any> => {
	const res = await apiClient?.get(`${prefix}/get-dropdown`);

	return res.data;
};

export const searchFeatures = async (
	params: AxiosRequestConfig['params'],
): Promise<any> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getFeatureById = async (
	id: string | number,
): Promise<IFeature> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const getFeaturesByUser = async (user_id: string): Promise<any> => {
	const res = await apiClient?.get(`${prefix}/get-features-user/${user_id}`);

	return res?.data;
};

export const getFeatureByRole = async (id: number): Promise<IFeature> => {
	const res = await apiClient.get(`${prefix}/get-by-role/` + id);
	return res.data;
};

export const createFeature = async (data: IFeature): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateFeature = async (data: IFeature): Promise<IBaseResponse> => {
	const res = await apiClient?.put(`${prefix}/update`, data);

	return res.data;
};

export const deleteFeature = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};

export const searchFeatureTree = async (
	data: IFeature[],
): Promise<IFeature[]> => {
	const result: IFeature[] = [];
	for (const func of data) {
		let node: IFeature = func;
		if (!result.some((x) => x.function_id === node.function_id))
			result.push(node);
		while (node.parent_id !== 0) {
			node = await getFeatureByIdRepository(node.parent_id);

			if (!result.some((x) => x.function_id === node.function_id))
				result.push(node);
		}
	}

	return result;
};
