import { Contact } from '@/components/admin/contact/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quản lý chức vụ',
};

export default function ContactPage() {
	return (
		<>
			<Contact />
		</>
	);
}
