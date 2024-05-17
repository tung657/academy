import { AxiosRequestConfig } from 'axios';
import {
	getJobDropdown,
	createJob,
	deleteJob,
	getJobById,
	searchJob,
	updateJob,
	toggleActiveJob,
} from '../services/job.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_JOB = {
	SEARCH: 'JOBS',
	DETAIL: 'JOB_DETAIL',
	DROPDOWN: 'JOB_DROPDOWN',
};

// Get detail
const useGetJobById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getJobById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getJobById>>({
		...config,
		queryKey: [CACHE_JOB.DETAIL, id],
		queryFn: () => getJobById(id),
	});
};

// Dropdown
const useGetJobDropdown = ({
	config,
}: {
	config?: QueryConfig<typeof getJobDropdown>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getJobDropdown>>({
		...config,
		queryKey: [CACHE_JOB.DROPDOWN],
		queryFn: () => getJobDropdown(),
	});
};

// Search list
const useSearchJob = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchJob>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchJob>>({
		...config,
		queryKey: [CACHE_JOB.SEARCH, params],
		queryFn: async () => searchJob(params),
	});
};

// Update
const useUpdateJob = ({
	config,
}: {
	config?: MutationConfig<typeof updateJob>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateJob,
	});
};

// Update
const useToggleActiveJob = ({
	config,
}: {
	config?: MutationConfig<typeof toggleActiveJob>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: toggleActiveJob,
	});
};

// Create
const useCreateJob = ({
	config,
}: {
	config?: MutationConfig<typeof createJob>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createJob,
	});
};

// Delete
const useDeleteJob = ({
	config,
}: {
	config?: MutationConfig<typeof deleteJob>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteJob,
	});
};

export {
	useCreateJob,
	useGetJobDropdown,
	useToggleActiveJob,
	useDeleteJob,
	useGetJobById,
	useSearchJob,
	useUpdateJob,
};
