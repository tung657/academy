import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import {
	createBlog,
	deleteBlog,
	getBlogById,
	searchBlog,
	updateBlog,
	updateViewBlog,
} from '../services/blog.service';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_BLOG = {
	SEARCH: 'BLOGS',
	DETAIL: 'BLOG_DETAIL',
	DROPDOWN: 'BLOG_DROPDOWN',
};

// Get detail
const useGetBlogById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getBlogById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getBlogById>>({
		...config,
		queryKey: [CACHE_BLOG.DETAIL, id],
		queryFn: () => getBlogById(id),
	});
};

// Search list
const useSearchBlog = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchBlog>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchBlog>>({
		...config,
		queryKey: [CACHE_BLOG.SEARCH, params],
		queryFn: async () => searchBlog(params),
	});
};

// Update
const useUpdateBlog = ({
	config,
}: {
	config?: MutationConfig<typeof updateBlog>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateBlog,
	});
};

// Update
const useUpdateViewBlog = ({
	config,
}: {
	config?: MutationConfig<typeof updateViewBlog>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateViewBlog,
	});
};

// Create
const useCreateBlog = ({
	config,
}: {
	config?: MutationConfig<typeof createBlog>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createBlog,
	});
};

// Delete
const useDeleteBlog = ({
	config,
}: {
	config?: MutationConfig<typeof deleteBlog>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteBlog,
	});
};

export {
	useCreateBlog,
	useDeleteBlog,
	useGetBlogById,
	useSearchBlog,
	useUpdateBlog,
	useUpdateViewBlog,
};
