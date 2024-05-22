import { Blog } from '@/components/admin/blog/Blog';
import { Metadata } from 'next';

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
