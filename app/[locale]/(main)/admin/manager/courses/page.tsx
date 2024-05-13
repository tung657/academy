import { Course } from '@/components/admin/course/Course';
import { Metadata } from 'next';

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
