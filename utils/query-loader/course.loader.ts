import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import {
	createCourse,
	deleteCourse,
	getCourseById,
	getCourseDropdown,
	searchCourses,
	updateCourse,
} from '../services/course.service';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_COURSE = {
	SEARCH: 'COURSES',
	DETAIL: 'COURSE_DETAIL',
	DROPDOWN: 'COURSE_DROPDOWN',
};

// Get detail
const useGetCourseById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getCourseById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getCourseById>>({
		...config,
		queryKey: [CACHE_COURSE.DETAIL, id],
		queryFn: () => getCourseById(id),
	});
};

// Dropdown
const useGetCourseDropdown = ({
	config,
}: {
	config?: QueryConfig<typeof getCourseDropdown>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getCourseDropdown>>({
		...config,
		queryKey: [CACHE_COURSE.DROPDOWN],
		queryFn: () => getCourseDropdown(),
	});
};

// Search list
const useSearchCourses = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchCourses>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchCourses>>({
		...config,
		queryKey: [CACHE_COURSE.SEARCH, params],
		queryFn: async () => searchCourses(params),
	});
};

// Update
const useUpdateCourse = ({
	config,
}: {
	config?: MutationConfig<typeof updateCourse>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateCourse,
	});
};

// Create
const useCreateCourse = ({
	config,
}: {
	config?: MutationConfig<typeof createCourse>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createCourse,
	});
};

// Delete
const useDeleteCourse = ({
	config,
}: {
	config?: MutationConfig<typeof deleteCourse>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteCourse,
	});
};

export {
	useCreateCourse,
	useGetCourseDropdown,
	useDeleteCourse,
	useGetCourseById,
	useSearchCourses,
	useUpdateCourse,
};
