import { Metadata } from 'next';

import { CourseRegister } from '@/components/admin/course-register/CourseRegister';

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
