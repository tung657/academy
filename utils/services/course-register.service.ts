import { apiClient } from '@/helpers';
import { IBaseDelete, IBaseResponse } from '@/types';
import {
	ICourseRegister,
	ISearchCourseRegister,
} from '@/types/course-register';

const prefix = '/course-registers';

export const searchCourseRegister = async (
	params: ISearchCourseRegister,
): Promise<IBaseResponse<ICourseRegister[]>> => {
	const res = await apiClient?.post(`${prefix}/search`, params);

	return res.data;
};

export const createCourseRegister = async (
	data: ICourseRegister,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/create`, data);

	return res.data;
};

export const updateCourseRegister = async (
	data: ICourseRegister,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/update`, data);

	return res.data;
};

export const deleteCourseRegister = async (
	data: IBaseDelete,
): Promise<IBaseResponse> => {
	const res = await apiClient?.post(`${prefix}/delete`, data);

	return res.data;
};
