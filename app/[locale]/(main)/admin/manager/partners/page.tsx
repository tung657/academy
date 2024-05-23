import { Metadata } from 'next';

import { Partner } from '@/components/admin/partner/Partner';

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
