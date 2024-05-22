import { useMutation } from '@tanstack/react-query';

import { createPermissionForFunction } from '../services/permission.service';
import { MutationConfig } from './react-query';

export const CACHE_PERMISSION = {
	DETAIL: 'PERMISSION_DETAIL',
};

const useCreatePermissionForFunction = ({
	config,
}: {
	config?: MutationConfig<typeof createPermissionForFunction>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: createPermissionForFunction,
	});
};

export { useCreatePermissionForFunction };
