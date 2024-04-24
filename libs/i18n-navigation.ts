import { AppConfig } from '@/utils/config';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({
		locales: AppConfig.locales,
		localePrefix: AppConfig.localePrefix,
	});
