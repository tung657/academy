import { redirect } from '@/libs/i18n-navigation';
import { ADMIN_USER_URL } from '@/libs/urls';

export default async function Page() {
	redirect(ADMIN_USER_URL);

	return <></>;
}
