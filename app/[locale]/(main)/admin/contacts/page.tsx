import { Metadata } from 'next';

import { Contact } from '@/components/admin/contact/Contact';

export const metadata: Metadata = {
	title: 'Quản lý liên hệ',
};

export default function ContactPage() {
	return (
		<>
			<Contact />
		</>
	);
}
