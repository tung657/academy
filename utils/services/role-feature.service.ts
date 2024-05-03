import { apiClient } from '@/helpers';
import { IBaseResponse } from '@/types';

const prefix = `/role-feature`;

export const createPerFeaForRole = async (
	data: any,
): Promise<IBaseResponse> => {
	const res = await apiClient.post(`${prefix}/create`, data);

	return res.data;
};
