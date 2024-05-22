import { CV } from '@/components/admin/cv/CV';
import { Metadata } from 'next';

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
