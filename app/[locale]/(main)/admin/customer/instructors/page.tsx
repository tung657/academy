import { Instructor } from '@/components/admin/instructor/Instructor';
import { Metadata } from 'next';

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
