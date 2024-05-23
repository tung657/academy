import { Metadata } from 'next';

import { Instructor } from '@/components/admin/instructor/Instructor';

export const metadata: Metadata = {
	title: 'Quản lý chuyên gia',
};

export default async function InstructorPage() {
	return (
		<>
			<Instructor />
		</>
	);
}
