import { AxiosRequestConfig } from 'axios';
import {
	getBranchDropdown,
	createBranch,
	deleteBranch,
	getBranchById,
	searchBranch,
	updateBranch,
} from '../services/branch.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_BRANCH = {
	SEARCH: 'BRANCHES',
	DETAIL: 'BRANCH_DETAIL',
	DROPDOWN: 'BRANCH_DROPDOWN',
};

// Get detail
const useGetBranchById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getBranchById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getBranchById>>({
		...config,
		queryKey: [CACHE_BRANCH.DETAIL, id],
		queryFn: () => getBranchById(id),
	});
};

// Dropdown
const useGetBranchDropdown = ({
	config,
}: {
	config?: QueryConfig<typeof getBranchDropdown>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getBranchDropdown>>({
		...config,
		queryKey: [CACHE_BRANCH.DROPDOWN],
		queryFn: () => getBranchDropdown(),
	});
};

// Search list
const useSearchBranch = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchBranch>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchBranch>>({
		...config,
		queryKey: [CACHE_BRANCH.SEARCH, params],
		queryFn: async () => searchBranch(params),
	});
};

// Update
const useUpdateBranch = ({
	config,
}: {
	config?: MutationConfig<typeof updateBranch>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateBranch,
	});
};

// Create
const useCreateBranch = ({
	config,
}: {
	config?: MutationConfig<typeof createBranch>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createBranch,
	});
};

// Delete
const useDeleteBranch = ({
	config,
}: {
	config?: MutationConfig<typeof deleteBranch>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteBranch,
	});
};

export {
	useCreateBranch,
	useGetBranchDropdown,
	useDeleteBranch,
	useGetBranchById,
	useSearchBranch,
	useUpdateBranch,
};
