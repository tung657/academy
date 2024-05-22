import { Metadata } from 'next';

import { Employee } from '@/components/admin/employee/Employee';

export const metadata: Metadata = {
	title: 'Quản lý nhân viên',
};

export default async function EmployeePage() {
	return (
		<>
			<Employee />
		</>
	);
}
