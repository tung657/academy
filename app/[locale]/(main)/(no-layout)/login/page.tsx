import { getTranslations } from 'next-intl/server';

import { LoginForm } from '@/components/login/LoginForm';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'login',
	});

	return {
		title: t('meta_title'),
		description: t('meta_description'),
	};
}

export default function Login() {
	return <LoginForm />;
}
