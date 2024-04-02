'use client';

import { useGetSlideById } from '@/utils';

export const CourseBanner = (): JSX.Element => {
	const { data, isLoading, isError, error } = useGetSlideById({
		id: 1,
	});

	return (
		<>
			{isLoading
				? 'Loading...'
				: isError
					? data?.message || error?.message
					: data?.slide_id}
		</>
	);
};
