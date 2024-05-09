import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseResponse } from '@/types';
import { IInstructor, ISearchInstructor } from '@/types/instructor';
import { OptionsData } from '@mantine/core';

const prefix = '/instructors';

export const getInstructorDropdown = async (): Promise<OptionsData> => {
	const res = await apiClient?.get(`${prefix}/dropdown`);

	return res.data;
};

export const searchInstructors = async (
	params: ISearchInstructor,
): Promise<IBaseResponse<IInstructor[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getInstructorById = async (
	id: string | number,
): Promise<IInstructor> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createInstructor = async (
	data: IInstructor,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateInstructor = async (
	data: IInstructor,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const deleteInstructor = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
