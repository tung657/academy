import { useMutation, useQuery } from '@tanstack/react-query';

import { ISearchAction } from '@/types';

import {
	createAction,
	deleteAction,
	getActionDetail,
	searchActions,
	updateAction,
} from '../services/action.service';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_ACTION = {
	SEARCH: 'ACTIONS',
	DETAIL: 'ACTION_DETAIL',
};

// Get detail
const useGetActionDetail = ({
	id,
	enabled = false,
	config,
}: {
	id: string;
	enabled?: boolean;
	config?: QueryConfig<typeof getActionDetail>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getActionDetail>>({
		...config,
		enabled,
		queryKey: [CACHE_ACTION.DETAIL, id],
		queryFn: () => getActionDetail(id),
	});
};

// Search list
const useSearchActions = ({
	params,
	config,
}: {
	params: ISearchAction;
	config?: QueryConfig<typeof searchActions>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchActions>>({
		...config,
		queryKey: [CACHE_ACTION.SEARCH, params],
		queryFn: () => searchActions(params),
	});
};

// Update
const useUpdateAction = ({
	config,
}: {
	config?: MutationConfig<typeof updateAction>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateAction,
	});
};

// Create
const useCreateAction = ({
	config,
}: {
	config?: MutationConfig<typeof createAction>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createAction,
	});
};

// Delete
const useDeleteAction = ({
	config,
}: {
	config?: MutationConfig<typeof deleteAction>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteAction,
	});
};

export {
	useCreateAction,
	useDeleteAction,
	useGetActionDetail,
	useSearchActions,
	useUpdateAction,
};
