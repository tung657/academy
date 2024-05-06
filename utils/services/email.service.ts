import { apiClient } from '@/helpers';
import { IBaseResponse } from '@/types';

const prefix = '/email';

export const sendResetPassword = async (data: any): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/reset-password`, data);

	return res.data;
};
