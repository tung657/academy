import { redirect } from '@/libs/i18n-navigation';
import { ADMIN_JOB_URL } from '@/libs/urls';

export default async function Page() {
	redirect(ADMIN_JOB_URL);

	return <></>;
}
