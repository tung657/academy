import { Metadata } from 'next';

import { StatisticCard } from '@/components/admin/dashboard/StatisticCard';
import { StatisticTable } from '@/components/admin/dashboard/StatisticTable';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	return (
		<>
			<StatisticCard />
			<StatisticTable />
		</>
	);
}
