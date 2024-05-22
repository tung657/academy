import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import {
	createContact,
	deleteContact,
	getContactById,
	getContactDropdown,
	searchContact,
} from '../services/contact.service';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

export const CACHE_CONTACT = {
	SEARCH: 'CONTACTS',
	DETAIL: 'CONTACT_DETAIL',
	DROPDOWN: 'CONTACT_DROPDOWN',
};

// Get detail
const useGetContactById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getContactById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getContactById>>({
		...config,
		queryKey: [CACHE_CONTACT.DETAIL, id],
		queryFn: () => getContactById(id),
	});
};

// Dropdown
const useGetContactDropdown = ({
	config,
}: {
	config?: QueryConfig<typeof getContactDropdown>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getContactDropdown>>({
		...config,
		queryKey: [CACHE_CONTACT.DROPDOWN],
		queryFn: () => getContactDropdown(),
	});
};

// Search list
const useSearchContact = ({
	params,
	config,
}: {
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchContact>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchContact>>({
		...config,
		queryKey: [CACHE_CONTACT.SEARCH, params],
		queryFn: async () => searchContact(params),
	});
};

// Create
const useCreateContact = ({
	config,
}: {
	config?: MutationConfig<typeof createContact>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createContact,
	});
};

// Delete
const useDeleteContact = ({
	config,
}: {
	config?: MutationConfig<typeof deleteContact>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteContact,
	});
};

export {
	useCreateContact,
	useGetContactDropdown,
	useDeleteContact,
	useGetContactById,
	useSearchContact,
};
