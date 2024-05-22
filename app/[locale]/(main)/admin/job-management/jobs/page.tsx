import { Metadata } from 'next';

import { Job } from '@/components/admin/job/Job';

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
