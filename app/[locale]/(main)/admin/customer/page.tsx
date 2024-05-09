import { redirect } from '@/libs/i18n-navigation';
import { ADMIN_PRODUCT_URL } from '@/libs/urls';

export default async function Page() {
	redirect(ADMIN_PRODUCT_URL);

	return <></>;
}
