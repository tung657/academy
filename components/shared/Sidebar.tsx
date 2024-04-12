'use client';

import { useSearchFeatures } from '@/utils';
import { NavLink } from '@mantine/core';
import classes from './scss/sidebar.module.scss';

export const Sidebar = (): JSX.Element => {
	const { data: features, isLoading } = useSearchFeatures({
		params: {},
	});

	const renderNav = (children: any[]) => {
		if (children?.length === 0) return false;
		return children?.map((item) => (
			<NavLink
				classNames={classes}
				key={item.key}
				label={item.title}
				href={item.url}
				childrenOffset={8}
				variant="filled"
				fw={700}
				px={4}
			>
				{renderNav(item.children)}
			</NavLink>
		));
	};

	return <>{isLoading ? 'Loading...' : renderNav(features || [])}</>;
};
