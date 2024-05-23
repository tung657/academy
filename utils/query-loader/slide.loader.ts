import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import {
	createSlide,
	deleteSlide,
	getSlideById,
	searchSlide,
	updateSlide,
} from '../services/slide.service';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

const CACHE_SLIDE = {
	SEARCH: 'SLIDES',
	DETAIL: 'SLIDE_DETAIL',
};

// Get detail
const useGetSlideById = ({
	id,
	config,
}: {
	id: number;
	config?: QueryConfig<typeof getSlideById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getSlideById>>({
		...config,
		queryKey: [CACHE_SLIDE.DETAIL, id],
		queryFn: () => getSlideById(id),
	});
};

// Search list
const useSearchSlide = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchSlide>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchSlide>>({
		...config,
		queryKey: [CACHE_SLIDE.SEARCH, params],
		queryFn: () => searchSlide(params),
	});
};

// Update
const useUpdateSlide = ({
	config,
}: {
	config?: MutationConfig<typeof updateSlide>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateSlide,
	});
};

// Create
const useCreateSlide = ({
	config,
}: {
	config?: MutationConfig<typeof createSlide>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createSlide,
	});
};

// Delete
const useDeleteSlide = ({
	config,
}: {
	config?: MutationConfig<typeof deleteSlide>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteSlide,
	});
};

export {
	CACHE_SLIDE,
	useCreateSlide,
	useDeleteSlide,
	useGetSlideById,
	useSearchSlide,
	useUpdateSlide,
};
