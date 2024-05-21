import { redirect } from '@/libs/i18n-navigation';
import { ADMIN_COURSE_URL } from '@/libs/urls';

export default async function Page() {
	redirect(ADMIN_COURSE_URL);

	return <></>;
}
