import { AxiosRequestConfig } from 'axios';

import {
	createSlide,
	deleteSlide,
	getSlideById,
	searchSlides,
	updateSlide,
} from '../services/slide.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

const CACHE_SLIDES = {
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
		queryKey: [CACHE_SLIDES.DETAIL, id],
		queryFn: () => getSlideById(id),
	});
};

// Search list
const useSearchSlides = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchSlides>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchSlides>>({
		...config,
		queryKey: [CACHE_SLIDES.SEARCH, params],
		queryFn: () => searchSlides(params),
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
	CACHE_SLIDES,
	useCreateSlide,
	useDeleteSlide,
	useGetSlideById,
	useSearchSlides,
	useUpdateSlide,
};
