import { redirect } from '@/libs/i18n-navigation';
import { ADMIN_CUSTOMER_URL } from '@/libs/urls';

export default async function Page() {
	redirect(ADMIN_CUSTOMER_URL);

	return <></>;
}
