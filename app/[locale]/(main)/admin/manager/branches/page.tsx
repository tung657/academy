import { Metadata } from 'next';

import { Branch } from '@/components/admin/branch/Branch';

export const metadata: Metadata = {
	title: 'Quản lý chi nhánh',
};

export default async function BranchPage() {
	return (
		<>
			<Branch />
		</>
	);
}
