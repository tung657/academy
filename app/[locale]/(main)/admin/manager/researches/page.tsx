import { Research } from '@/components/admin/research/research/Research';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quản lý nghiên cứu',
};

export default async function ResearchPage() {
	return (
		<>
			<Research />
		</>
	);
}
