import { AppConfig } from '@/utils';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({
		locales: AppConfig.locales,
		localePrefix: AppConfig.localePrefix,
	});
