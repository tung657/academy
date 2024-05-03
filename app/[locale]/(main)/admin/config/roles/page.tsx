import { RoleTree } from '@/components/admin/role/RoleTree';
import { Metadata } from 'next';

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
