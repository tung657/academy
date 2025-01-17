import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import {
	createFeature,
	deleteFeature,
	getFeatureById,
	getFeatureByRole,
	getFeaturesByUser,
	searchFeatures,
	updateFeature,
} from '../services/feature.service';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_FEATURE = {
	SEARCH: 'FEATURES',
	DETAIL: 'FEATURE_DETAIL',
	DETAIL_BY_ROLE: 'FEATURE_DETAIL_BY_ROLE',
};

// Get detail
const useGetFeatureById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getFeatureById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getFeatureById>>({
		...config,
		queryKey: [CACHE_FEATURE.DETAIL, id],
		queryFn: () => getFeatureById(id),
	});
};

const useGetFeatureByRole = ({
	id,
	config,
}: {
	id: number;
	config?: QueryConfig<typeof getFeatureByRole>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getFeatureByRole>>({
		...config,
		queryKey: [CACHE_FEATURE.DETAIL_BY_ROLE, id],
		queryFn: () => getFeatureByRole(id),
	});
};

// Search list
const useSearchFeatures = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchFeatures>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchFeatures>>({
		...config,
		queryKey: [CACHE_FEATURE.SEARCH, params],
		queryFn: async () => searchFeatures(params),
	});
};

// Search list
const useGetFeaturesByUser = ({
	user_id,
	config,
}: {
	user_id: string;
	config?: QueryConfig<typeof getFeaturesByUser>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getFeaturesByUser>>({
		...config,
		queryKey: [CACHE_FEATURE.SEARCH, user_id],
		queryFn: async () => getFeaturesByUser(user_id),
	});
};

// Update
const useUpdateFeature = ({
	config,
}: {
	config?: MutationConfig<typeof updateFeature>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateFeature,
	});
};

// Create
const useCreateFeature = ({
	config,
}: {
	config?: MutationConfig<typeof createFeature>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createFeature,
	});
};

// Delete
const useDeleteFeature = ({
	config,
}: {
	config?: MutationConfig<typeof deleteFeature>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteFeature,
	});
};

export {
	useCreateFeature,
	useDeleteFeature,
	useGetFeatureById,
	useGetFeatureByRole,
	useSearchFeatures,
	useUpdateFeature,
	useGetFeaturesByUser,
};
