import { apiClient } from '@/helpers';
import { IBaseResponse, IBaseSearch } from '@/types';
import { IDashboard, IDashboardBlog } from '@/types/dashboard';

const prefix = '/dashboard';

export const statisticCard = async (): Promise<IBaseResponse<IDashboard[]>> => {
	const res = await apiClient?.get(`${prefix}/statistic-card`);

	return res.data;
};

export const statisticBlog = async (
	data: IBaseSearch = {},
): Promise<IBaseResponse<IDashboardBlog[]>> => {
	const res = await apiClient?.post(`${prefix}/statistic-blog`, data);

	return res.data;
};
