import { ContactForm } from '@/components/contact/ContacForm';
import { Contact } from '@/components/contact/Contact';
import { Map } from '@/components/contact/Map';
import { AppConfig } from '@/utils';
import { getTranslations } from 'next-intl/server';

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
