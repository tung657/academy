import { useMutation, useQuery } from '@tanstack/react-query';

import { ISearchEmployees } from '@/types';

import {
	changePasswordEmployee,
	createEmployee,
	deleteEmployee,
	getEmployeeById,
	getNewPw,
	loginService,
	searchEmployees,
	updateEmployee,
} from '../services/user.service';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

const CACHE_EMPLOYEES = {
	SEARCH: 'EMPLOYEES',
	DETAIL: 'EMPLOYEE_DETAIL',
};

const useLogin = ({
	config,
}: {
	config?: MutationConfig<typeof loginService>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: loginService,
	});
};

const useGetEmployeeById = ({
	id,
	config,
}: {
	id: string;
	config?: QueryConfig<typeof getEmployeeById>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getEmployeeById>>({
		...config,
		queryKey: [CACHE_EMPLOYEES.DETAIL, id],
		queryFn: () => getEmployeeById(id),
	});
};

const useRestorePw = ({
	config,
}: {
	config?: MutationConfig<typeof getNewPw>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: getNewPw,
	});
};

const useCreateEmployee = ({
	config,
}: {
	config?: MutationConfig<typeof createEmployee>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createEmployee,
	});
};

const useUpdateEmployee = ({
	config,
}: {
	config?: MutationConfig<typeof updateEmployee>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: updateEmployee,
	});
};

const useChangePasswordEmployee = ({
	config,
}: {
	config?: MutationConfig<typeof changePasswordEmployee>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: changePasswordEmployee,
	});
};

const useDeleteEmployee = ({
	config,
}: {
	config?: MutationConfig<typeof deleteEmployee>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: deleteEmployee,
	});
};

const useSearchEmployees = ({
	params,
	config,
}: {
	params: ISearchEmployees;
	config?: QueryConfig<typeof searchEmployees>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchEmployees>>({
		...config,
		queryKey: [CACHE_EMPLOYEES.SEARCH, params],
		queryFn: () => searchEmployees(params),
	});
};

export {
	CACHE_EMPLOYEES,
	useLogin,
	useChangePasswordEmployee,
	useCreateEmployee,
	useDeleteEmployee,
	useGetEmployeeById,
	useRestorePw,
	useSearchEmployees,
	useUpdateEmployee,
};
