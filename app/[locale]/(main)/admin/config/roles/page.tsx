import { Metadata } from 'next';

import { RoleTree } from '@/components/admin/role/RoleTree';

export const metadata: Metadata = {
	title: 'Quản lý nhóm quyền',
};

export default function RolePage() {
	return (
		<>
			<RoleTree />
		</>
	);
}
