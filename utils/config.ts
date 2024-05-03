import { LocalePrefix } from '@/types/global';
import { storagePrefix } from './storage';
// as-needed help hide locale default
const localePrefix: LocalePrefix = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
	name: 'AIA',
	locales: ['vi', 'en'],
	defaultLocale: 'vi',
	localePrefix,
};

// For mantine notification

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const ERROR_TIMEOUT = 'read ECONNRESET';
export const ERROR_MANY = 'Too many connections';

export const LOCAL_TOKEN = storagePrefix + 'TOKEN';
export const LOCAL_USER = storagePrefix + 'USER';
export const LOCAL_COLOR = storagePrefix + 'COLOR';
export const LOCAL_CUSTOMER = storagePrefix + 'CUSTOMER';
export const LOCAL_EMPLOYEE = storagePrefix + 'EMPLOYEE';
export const LOCAL_COLLAPSE = storagePrefix + 'COLLAPSE';

export const SEARCH_PAGE = 'page';
export const SEARCH_SIZE = 'size';
export const SEARCH_CONTENT = 's';
export const SEARCH_FROM_DATE = 'fr';
export const SEARCH_TO_DATE = 'to';
export const SEARCH_BRANCH = 'br';
export const SEARCH_DEPARTMENT = 'dp';
export const SEARCH_FROM_DASH = 'fd';
