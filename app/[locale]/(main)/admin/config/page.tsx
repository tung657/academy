import { redirect } from '@/libs/i18n-navigation';
import { ADMIN_FEATURE_URL } from '@/libs/urls';

export default async function Page() {
	redirect(ADMIN_FEATURE_URL);

	return <></>;
}
