import { useMutation, useQuery } from '@tanstack/react-query';
import {
	changePasswordEmployee,
	createEmployee,
	deleteEmployee,
	getEmployeeById,
	getNewPw,
	loginService,
	searchEmployees,
	updateEmployee,
} from '../services';
import { AxiosRequestConfig } from 'axios';
import {
	ExtractFnReturnType,
	MutationConfig,
	QueryConfig,
} from './react-query';

const CACHE_EMPLOYEES = {
	SEARCH: 'EMPLOYEES',
	DETAIL: 'EMPLOYEE',
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
	params: AxiosRequestConfig['params'];
	config?: QueryConfig<typeof searchEmployees>;
}) => {
	return useQuery<ExtractFnReturnType<typeof searchEmployees>>({
		...config,
		queryKey: [CACHE_EMPLOYEES.SEARCH, params],
		queryFn: () => searchEmployees(params),
	});
};

const useGetNewPw = ({
	token,
	config,
}: {
	token: string;
	config?: QueryConfig<typeof getNewPw>;
}) => {
	return useQuery<ExtractFnReturnType<typeof getNewPw>>({
		...config,
		queryKey: [CACHE_EMPLOYEES.DETAIL, token],
		queryFn: () => getNewPw(token),
	});
};

export {
	CACHE_EMPLOYEES,
	useLogin,
	useChangePasswordEmployee,
	useCreateEmployee,
	useDeleteEmployee,
	useGetEmployeeById,
	useGetNewPw,
	useSearchEmployees,
	useUpdateEmployee,
};
