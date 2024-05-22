import { Metadata } from 'next';

import { Course } from '@/components/admin/course/Course';

export const metadata: Metadata = {
	title: 'Quản lý khóa học',
};

export default async function CoursePage() {
	return (
		<>
			<Course />
		</>
	);
}
