import { useQuery } from '@tanstack/react-query';

import { IBaseSearch } from '@/types';

import { statisticBlog, statisticCard } from '../services/dashboard.service';
import { ExtractFnReturnType, QueryConfig } from './react-query';

export const CACHE_DASHBOARD = {
	DASHBOARD_CARD: 'DASHBOARD_CARD',
	DASHBOARD_BLOG: 'DASHBOARD_BLOG',
};

// Get detail
const useStatisticCard = ({
	config,
}: {
	config?: QueryConfig<typeof statisticCard>;
}) => {
	return useQuery<ExtractFnReturnType<typeof statisticCard>>({
		...config,
		queryKey: [CACHE_DASHBOARD.DASHBOARD_CARD],
		queryFn: () => statisticCard(),
	});
};

const useStatisticBlog = ({
	params,
	config,
}: {
	params?: IBaseSearch;
	config?: QueryConfig<typeof statisticBlog>;
}) => {
	return useQuery<ExtractFnReturnType<typeof statisticBlog>>({
		...config,
		queryKey: [CACHE_DASHBOARD.DASHBOARD_BLOG, params],
		queryFn: () => statisticBlog(params),
	});
};

export { useStatisticCard, useStatisticBlog };
