import { Metadata } from 'next';

import { Position } from '@/components/admin/position/Position';

export const metadata: Metadata = {
	title: 'Quản lý chức vụ',
};

export default function PositionPage() {
	return (
		<>
			<Position />
		</>
	);
}
