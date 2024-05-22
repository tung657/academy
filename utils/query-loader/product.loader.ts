import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import {
	createProduct,
	deleteProduct,
	getProductById,
	getProductDropdown,
	searchProduct,
	updateProduct,
} from '../services/product.service';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_PRODUCT = {
	SEARCH: 'PRODUCTS',
	DETAIL: 'PRODUCT_DETAIL',
	DROPDOWN: 'PRODUCT_DROPDOWN',
};

// Get detail
const useGetProductById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getProductById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getProductById>>({
		...config,
		queryKey: [CACHE_PRODUCT.DETAIL, id],
		queryFn: () => getProductById(id),
	});
};

// Dropdown
const useGetProductDropdown = ({
	config,
}: {
	config?: QueryConfig<typeof getProductDropdown>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getProductDropdown>>({
		...config,
		queryKey: [CACHE_PRODUCT.DROPDOWN],
		queryFn: () => getProductDropdown(),
	});
};

// Search list
const useSearchProduct = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchProduct>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchProduct>>({
		...config,
		queryKey: [CACHE_PRODUCT.SEARCH, params],
		queryFn: async () => searchProduct(params),
	});
};

// Update
const useUpdateProduct = ({
	config,
}: {
	config?: MutationConfig<typeof updateProduct>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateProduct,
	});
};

// Create
const useCreateProduct = ({
	config,
}: {
	config?: MutationConfig<typeof createProduct>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createProduct,
	});
};

// Delete
const useDeleteProduct = ({
	config,
}: {
	config?: MutationConfig<typeof deleteProduct>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteProduct,
	});
};

export {
	useCreateProduct,
	useGetProductDropdown,
	useDeleteProduct,
	useGetProductById,
	useSearchProduct,
	useUpdateProduct,
};
