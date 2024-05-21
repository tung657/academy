import { Slide } from '@/components/admin/slide/Slide';
import { Metadata } from 'next';

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
