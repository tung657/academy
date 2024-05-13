import { Position } from '@/components/admin/position/Position';
import { Metadata } from 'next';

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
