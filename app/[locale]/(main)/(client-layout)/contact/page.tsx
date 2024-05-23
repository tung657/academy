import { getTranslations } from 'next-intl/server';

import { Contact } from '@/components/contact/Contact';
import { ContactForm } from '@/components/contact/ContactForm';
import { Map } from '@/components/contact/Map';
import { AppConfig } from '@/utils/config';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'contact',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default function ContactPage() {
	return (
		<>
			<Map />
			<Contact />
			<ContactForm />
		</>
	);
}
