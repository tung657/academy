import { Metadata } from 'next';

import { Blog } from '@/components/admin/blog/Blog';

export const metadata: Metadata = {
	title: 'Quản lý tin tức',
};

export default async function BlogPage() {
	return (
		<>
			<Blog />
		</>
	);
}
