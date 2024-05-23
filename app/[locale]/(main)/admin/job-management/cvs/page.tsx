import { Metadata } from 'next';

import { CV } from '@/components/admin/cv/CV';

export const metadata: Metadata = {
	title: 'Quản lý sơ yếu lý lịch',
};

export default async function CVPage() {
	return (
		<>
			<CV />
		</>
	);
}
