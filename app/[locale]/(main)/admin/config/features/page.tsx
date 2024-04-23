import { FeatureTree } from '@/components/admin/feature/FeatureTree';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quản lý tính năng',
};

export default function FeaturePage() {
	return (
		<>
			<FeatureTree />
		</>
	);
}
