import { Partner } from '@/components/admin/partner/Partner';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quản lý đối tác',
};

export default async function PartnerPage() {
	return (
		<>
			<Partner />
		</>
	);
}
