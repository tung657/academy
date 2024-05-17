import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseResponse } from '@/types';
import { IJob, ISearchJob } from '@/types/job';
import { OptionsData } from '@mantine/core';

const prefix = '/jobs';

export const getJobDropdown = async (): Promise<OptionsData> => {
	const res = await apiClient?.get(`${prefix}/dropdown`);

	return res.data;
};

export const searchJob = async (
	params: ISearchJob,
): Promise<IBaseResponse<IJob[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getJobById = async (id: string | number): Promise<IJob> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createJob = async (data: IJob): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateJob = async (data: IJob): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const toggleActiveJob = async (data: IJob): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/toggle-active`, data);

	return res.data;
};

export const deleteJob = async (data: IBaseDelete): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
