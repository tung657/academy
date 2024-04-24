import { AxiosRequestConfig } from 'axios';
import {
	getPositionDropdown,
	createPosition,
	deletePosition,
	getPositionById,
	searchPositions,
	updatePosition,
} from '../services/position.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_POSITION = {
	SEARCH: 'POSITIONS',
	DETAIL: 'POSITION_DETAIL',
	DROPDOWN: 'POSITION_DROPDOWN',
};

// Get detail
const useGetPositionById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getPositionById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getPositionById>>({
		...config,
		queryKey: [CACHE_POSITION.DETAIL, id],
		queryFn: () => getPositionById(id),
	});
};

// Dropdown
const useGetPositionDropdown = ({
	config,
}: {
	config?: QueryConfig<typeof getPositionDropdown>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getPositionDropdown>>({
		...config,
		queryKey: [CACHE_POSITION.DROPDOWN],
		queryFn: () => getPositionDropdown(),
	});
};

// Search list
const useSearchPositions = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchPositions>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchPositions>>({
		...config,
		queryKey: [CACHE_POSITION.SEARCH, params],
		queryFn: async () => searchPositions(params),
	});
};

// Update
const useUpdatePosition = ({
	config,
}: {
	config?: MutationConfig<typeof updatePosition>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updatePosition,
	});
};

// Create
const useCreatePosition = ({
	config,
}: {
	config?: MutationConfig<typeof createPosition>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createPosition,
	});
};

// Delete
const useDeletePosition = ({
	config,
}: {
	config?: MutationConfig<typeof deletePosition>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deletePosition,
	});
};

export {
	useCreatePosition,
	useGetPositionDropdown,
	useDeletePosition,
	useGetPositionById,
	useSearchPositions,
	useUpdatePosition,
};
