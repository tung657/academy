import { AxiosRequestConfig } from 'axios';
import {
	getResearchTypeDropdown,
	createResearchType,
	deleteResearchType,
	getResearchTypeById,
	searchResearchType,
	updateResearchType,
} from '../services/research-type.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_RESEARCH_TYPE = {
	SEARCH: 'RESEARCH_TYPES',
	DETAIL: 'RESEARCH_TYPE_DETAIL',
	DROPDOWN: 'RESEARCH_TYPE_DROPDOWN',
};

// Get detail
const useGetResearchTypeById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getResearchTypeById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getResearchTypeById>>({
		...config,
		queryKey: [CACHE_RESEARCH_TYPE.DETAIL, id],
		queryFn: () => getResearchTypeById(id),
	});
};

// Dropdown
const useGetResearchTypeDropdown = ({
	config,
}: {
	config?: QueryConfig<typeof getResearchTypeDropdown>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getResearchTypeDropdown>>({
		...config,
		queryKey: [CACHE_RESEARCH_TYPE.DROPDOWN],
		queryFn: () => getResearchTypeDropdown(),
	});
};

// Search list
const useSearchResearchType = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchResearchType>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchResearchType>>({
		...config,
		queryKey: [CACHE_RESEARCH_TYPE.SEARCH, params],
		queryFn: async () => searchResearchType(params),
	});
};

// Update
const useUpdateResearchType = ({
	config,
}: {
	config?: MutationConfig<typeof updateResearchType>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateResearchType,
	});
};

// Create
const useCreateResearchType = ({
	config,
}: {
	config?: MutationConfig<typeof createResearchType>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createResearchType,
	});
};

// Delete
const useDeleteResearchType = ({
	config,
}: {
	config?: MutationConfig<typeof deleteResearchType>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteResearchType,
	});
};

export {
	useCreateResearchType,
	useGetResearchTypeDropdown,
	useDeleteResearchType,
	useGetResearchTypeById,
	useSearchResearchType,
	useUpdateResearchType,
};
