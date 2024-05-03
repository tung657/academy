import {
	getRoleDropdown,
	createRole,
	deleteRole,
	getRoleById,
	searchRoles,
	updateRole,
} from '../services/role.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';
import { ISearchRoles } from '@/types';

export const CACHE_ROLE = {
	SEARCH: 'ROLES',
	DETAIL: 'ROLE_DETAIL',
	DROPDOWN: 'ROLE_DROPDOWN',
};

// Get detail
const useGetRoleById = ({
	id,
	config,
}: {
	id: string | number;
	config?: QueryConfig<typeof getRoleById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getRoleById>>({
		...config,
		queryKey: [CACHE_ROLE.DETAIL, id],
		queryFn: () => getRoleById(id),
	});
};

// Dropdown
const useGetRoleDropdown = ({
	config,
}: {
	config?: QueryConfig<typeof getRoleDropdown>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getRoleDropdown>>({
		...config,
		queryKey: [CACHE_ROLE.DROPDOWN],
		queryFn: () => getRoleDropdown(),
	});
};

// Search list
const useSearchRoles = ({
	params,
	config,
}: {
	params: ISearchRoles;
	config?: QueryConfig<typeof searchRoles>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchRoles>>({
		...config,
		queryKey: [CACHE_ROLE.SEARCH, params],
		queryFn: async () => searchRoles(params),
	});
};

// Update
const useUpdateRole = ({
	config,
}: {
	config?: MutationConfig<typeof updateRole>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateRole,
	});
};

// Create
const useCreateRole = ({
	config,
}: {
	config?: MutationConfig<typeof createRole>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createRole,
	});
};

// Delete
const useDeleteRole = ({
	config,
}: {
	config?: MutationConfig<typeof deleteRole>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteRole,
	});
};

export {
	useCreateRole,
	useGetRoleDropdown,
	useDeleteRole,
	useGetRoleById,
	useSearchRoles,
	useUpdateRole,
};
