import { LOCAL_USER } from '@/utils';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	const cook = cookies();
	console.log(JSON.parse(cook.get(LOCAL_USER)?.value || '{}'));

	return <>Dashboard</>;
}
