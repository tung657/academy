import { Job } from '@/components/admin/job/Job';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quản lý tuyển dụng',
};

export default async function JobPage() {
	return (
		<>
			<Job />
		</>
	);
}
