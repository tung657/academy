import { Employee } from '@/components/admin/employee/Employee';
import { Metadata } from 'next';

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
