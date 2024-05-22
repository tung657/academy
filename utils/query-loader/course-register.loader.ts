import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import {
	createCourseRegister,
	deleteCourseRegister,
	searchCourseRegister,
	updateCourseRegister,
} from '../services/course-register.service';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_COURSE_REGISTER = {
	SEARCH: 'COURSE_REGISTERS',
	DETAIL: 'COURSE_REGISTER_DETAIL',
	DROPDOWN: 'COURSE_REGISTER_DROPDOWN',
};

// Search list
const useSearchCourseRegister = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchCourseRegister>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchCourseRegister>>({
		...config,
		queryKey: [CACHE_COURSE_REGISTER.SEARCH, params],
		queryFn: async () => searchCourseRegister(params),
	});
};

// Create
const useCreateCourseRegister = ({
	config,
}: {
	config?: MutationConfig<typeof createCourseRegister>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createCourseRegister,
	});
};

// Update
const useUpdateCourseRegister = ({
	config,
}: {
	config?: MutationConfig<typeof updateCourseRegister>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateCourseRegister,
	});
};

// Delete
const useDeleteCourseRegister = ({
	config,
}: {
	config?: MutationConfig<typeof deleteCourseRegister>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteCourseRegister,
	});
};

export {
	useCreateCourseRegister,
	useUpdateCourseRegister,
	useDeleteCourseRegister,
	useSearchCourseRegister,
};
