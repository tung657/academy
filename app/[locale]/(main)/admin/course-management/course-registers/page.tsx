import { CourseRegister } from '@/components/admin/course-register/CourseRegister';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quản lý liên hệ',
};

export default function CourseRegisterPage() {
	return (
		<>
			<CourseRegister />
		</>
	);
}
