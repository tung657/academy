import { AxiosRequestConfig } from 'axios';
import {
	createPartner,
	deletePartner,
	getPartnerById,
	searchPartner,
	updatePartner,
} from '../services/partner.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_PARTNER = {
	SEARCH: 'PARTNERS',
	DETAIL: 'PARTNER_DETAIL',
	DROPDOWN: 'PARTNER_DROPDOWN',
};

// Get detail
const useGetPartnerById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getPartnerById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getPartnerById>>({
		...config,
		queryKey: [CACHE_PARTNER.DETAIL, id],
		queryFn: () => getPartnerById(id),
	});
};

// Search list
const useSearchPartner = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchPartner>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchPartner>>({
		...config,
		queryKey: [CACHE_PARTNER.SEARCH, params],
		queryFn: async () => searchPartner(params),
	});
};

// Update
const useUpdatePartner = ({
	config,
}: {
	config?: MutationConfig<typeof updatePartner>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updatePartner,
	});
};

// Create
const useCreatePartner = ({
	config,
}: {
	config?: MutationConfig<typeof createPartner>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createPartner,
	});
};

// Delete
const useDeletePartner = ({
	config,
}: {
	config?: MutationConfig<typeof deletePartner>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deletePartner,
	});
};

export {
	useCreatePartner,
	useDeletePartner,
	useGetPartnerById,
	useSearchPartner,
	useUpdatePartner,
};
