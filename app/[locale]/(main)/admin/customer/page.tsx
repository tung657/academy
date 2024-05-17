import { redirect } from '@/libs/i18n-navigation';
import { ADMIN_CONTACT_URL } from '@/libs/urls';

export default async function Page() {
	redirect(ADMIN_CONTACT_URL);

	return <></>;
}
