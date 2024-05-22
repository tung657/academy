import { Metadata } from 'next';

import { Research } from '@/components/admin/research/research/Research';

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
