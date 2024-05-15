import { AxiosRequestConfig } from 'axios';
import {
	getResearchDropdown,
	createResearch,
	deleteResearch,
	getResearchById,
	searchResearch,
	updateResearch,
} from '../services/research.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_RESEARCH = {
	SEARCH: 'RESEARCHES',
	DETAIL: 'RESEARCH_DETAIL',
	DROPDOWN: 'RESEARCH_DROPDOWN',
};

// Get detail
const useGetResearchById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getResearchById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getResearchById>>({
		...config,
		queryKey: [CACHE_RESEARCH.DETAIL, id],
		queryFn: () => getResearchById(id),
	});
};

// Dropdown
const useGetResearchDropdown = ({
	config,
}: {
	config?: QueryConfig<typeof getResearchDropdown>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getResearchDropdown>>({
		...config,
		queryKey: [CACHE_RESEARCH.DROPDOWN],
		queryFn: () => getResearchDropdown(),
	});
};

// Search list
const useSearchResearch = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchResearch>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchResearch>>({
		...config,
		queryKey: [CACHE_RESEARCH.SEARCH, params],
		queryFn: async () => searchResearch(params),
	});
};

// Update
const useUpdateResearch = ({
	config,
}: {
	config?: MutationConfig<typeof updateResearch>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateResearch,
	});
};

// Create
const useCreateResearch = ({
	config,
}: {
	config?: MutationConfig<typeof createResearch>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createResearch,
	});
};

// Delete
const useDeleteResearch = ({
	config,
}: {
	config?: MutationConfig<typeof deleteResearch>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteResearch,
	});
};

export {
	useCreateResearch,
	useGetResearchDropdown,
	useDeleteResearch,
	useGetResearchById,
	useSearchResearch,
	useUpdateResearch,
};
