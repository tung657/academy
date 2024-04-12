import { HowItsWork } from '@/components/about/HowItsWork';
import { CourseBanner } from '@/components/about/CourseBanner';
import { MemberHome } from '@/components/home/MemberHome';
import { Process } from '@/components/about/Process';
import { Swiper } from '@/components/about/Swiper';
import { getTranslations } from 'next-intl/server';
import { AppConfig } from '@/utils';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'about',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default async function About() {
	return (
		<>
			<CourseBanner />
			<MemberHome />
			<HowItsWork />
			<Process />
			<Swiper />
		</>
	);
}
