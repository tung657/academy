import { Metadata } from 'next';

import { Slide } from '@/components/admin/slide/Slide';

export const metadata: Metadata = {
	title: 'Quản lý slides',
};

export default async function SlidePage() {
	return (
		<>
			<Slide />
		</>
	);
}
