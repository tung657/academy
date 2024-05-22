import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import {
	createInstructor,
	deleteInstructor,
	getInstructorById,
	getInstructorDropdown,
	searchInstructors,
	updateInstructor,
} from '../services/instructor.service';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_INSTRUCTOR = {
	SEARCH: 'INSTRUCTORS',
	DETAIL: 'INSTRUCTOR_DETAIL',
	DROPDOWN: 'INSTRUCTOR_DROPDOWN',
};

// Get detail
const useGetInstructorById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getInstructorById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getInstructorById>>({
		...config,
		queryKey: [CACHE_INSTRUCTOR.DETAIL, id],
		queryFn: () => getInstructorById(id),
	});
};

// Dropdown
const useGetInstructorDropdown = ({
	config,
}: {
	config?: QueryConfig<typeof getInstructorDropdown>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getInstructorDropdown>>({
		...config,
		queryKey: [CACHE_INSTRUCTOR.DROPDOWN],
		queryFn: () => getInstructorDropdown(),
	});
};

// Search list
const useSearchInstructors = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchInstructors>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchInstructors>>({
		...config,
		queryKey: [CACHE_INSTRUCTOR.SEARCH, params],
		queryFn: async () => searchInstructors(params),
	});
};

// Update
const useUpdateInstructor = ({
	config,
}: {
	config?: MutationConfig<typeof updateInstructor>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateInstructor,
	});
};

// Create
const useCreateInstructor = ({
	config,
}: {
	config?: MutationConfig<typeof createInstructor>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createInstructor,
	});
};

// Delete
const useDeleteInstructor = ({
	config,
}: {
	config?: MutationConfig<typeof deleteInstructor>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteInstructor,
	});
};

export {
	useCreateInstructor,
	useGetInstructorDropdown,
	useDeleteInstructor,
	useGetInstructorById,
	useSearchInstructors,
	useUpdateInstructor,
};
