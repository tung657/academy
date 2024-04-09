import { HowItsWork } from '@/components/course/HowItsWork';
import { CourseBanner } from '@/components/course/CourseBanner';
import { MemberHome } from '@/components/home/MemberHome';
import { Process } from '@/components/course/Process';
import { Swiper } from '@/components/course/Swiper';
import { getTranslations } from 'next-intl/server';
import { AppConfig } from '@/utils';

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'about-us',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
	};
}

export default async function Course() {
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
