import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { createCV, deleteCV, searchCV } from '../services/cv.service';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_CV = {
	SEARCH: 'CVS',
	DETAIL: 'CV_DETAIL',
	DROPDOWN: 'CV_DROPDOWN',
};

// Search list
const useSearchCV = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchCV>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchCV>>({
		...config,
		queryKey: [CACHE_CV.SEARCH, params],
		queryFn: async () => searchCV(params),
	});
};

// Create
const useCreateCV = ({
	config,
}: {
	config?: MutationConfig<typeof createCV>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createCV,
	});
};

// Delete
const useDeleteCV = ({
	config,
}: {
	config?: MutationConfig<typeof deleteCV>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteCV,
	});
};

export { useCreateCV, useDeleteCV, useSearchCV };
