import { useMutation } from '@tanstack/react-query';
import { createPerFeaForRole } from '../services/role-feature.service';
import { MutationConfig } from './react-query';

export const CACHE_PERMISSION = {
	SEARCH: 'PERMISSIONS',
	DETAIL: 'PERMISSION_DETAIL',
};

const useCreatePerFeaForRole = ({
	config,
}: {
	config?: MutationConfig<typeof createPerFeaForRole>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createPerFeaForRole,
	});
};

export { useCreatePerFeaForRole };
