import { Metadata } from 'next';

import { FeatureTree } from '@/components/admin/feature/FeatureTree';

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
