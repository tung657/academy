import { useMutation } from '@tanstack/react-query';

import { sendResetPassword } from '../services/email.service';
import { MutationConfig } from './react-query';

const CACHE_EMAILS = {
	SEARCH: 'EMAILS',
	DETAIL: 'EMAIL_DETAIL',
};

// Create
const useSendResetPassword = ({
	config,
}: {
	config?: MutationConfig<typeof sendResetPassword>;
}) => {
	return useMutation({
		onMutate: () => {},
		onError: () => {},
		onSuccess: () => {},
		...config,
		mutationFn: sendResetPassword,
	});
};

export { CACHE_EMAILS, useSendResetPassword };
