import { Branch } from '@/components/admin/branch/Branch';
import { Metadata } from 'next';

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
