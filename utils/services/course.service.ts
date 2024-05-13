import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseResponse } from '@/types';
import { ICourse, ISearchCourse } from '@/types/course';
import { OptionsData } from '@mantine/core';

const prefix = '/courses';

export const getCourseDropdown = async (): Promise<OptionsData> => {
	const res = await apiClient?.get(`${prefix}/dropdown`);

	return res.data;
};

export const searchCourses = async (
	params: ISearchCourse,
): Promise<IBaseResponse<ICourse[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const getCourseById = async (id: string | number): Promise<ICourse> => {
	const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

	return res.data;
};

export const createCourse = async (data: ICourse): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateCourse = async (data: ICourse): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const deleteCourse = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
