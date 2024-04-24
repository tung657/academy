// src/i18n.ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { AppConfig } from '@/utils/config';

export default getRequestConfig(async ({ locale }) => {
	const baseLocale = new Intl.Locale(locale).baseName;
	if (!AppConfig.locales.includes(baseLocale)) notFound();

	return {
		messages: (await import(`@/locales/${baseLocale}.json`)).default,
	};
});
