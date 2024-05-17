import { NavTree } from '@/types/global';

// -------------------------- START CLIENT --------------------------------------
const HOME_URL = '/';

const ABOUT_URL = '/about-us';

const COURSE_URL = '/course';
const COURSE_DETAIL_URL = `${COURSE_URL}/:id`;

const RESEARCH_URL = '/research';
const RESEARCH_DETAIL_URL = `${RESEARCH_URL}/:id`;

const PRODUCT_URL = '/product';
const PRODUCT_DETAIL_URL = `${PRODUCT_URL}/:id`;

const CONTACT_URL = '/contact';

const JOB_URL = '/jobs';
const JOB_DETAIL_URL = `${JOB_URL}/:id`;

const BLOG_URL = '/blogs';
const BLOG_DETAIL_URL = `${BLOG_URL}/:id`;

const VERIFY_RESET_PASSWORD_URL = '/verify-reset-password';
// -------------------------- END CLIENT --------------------------------------

// -------------------------- START ADMIN --------------------------------------
const ADMIN_URL = '/admin';

const LOGIN_URL = `/login`;

const DASHBOARD_URL = `${ADMIN_URL}/dashboard`;

const ADMIN_CUSTOMER_URL = `${ADMIN_URL}/customer`;
const ADMIN_PRODUCT_URL = `${ADMIN_CUSTOMER_URL}/products`;

const ADMIN_MANAGE_URL = `${ADMIN_URL}/manager`;
const ADMIN_USER_URL = `${ADMIN_MANAGE_URL}/employees`;
const ADMIN_INSTRUCTOR_URL = `${ADMIN_MANAGE_URL}/instructors`;

const ADMIN_CONFIG_URL = `${ADMIN_URL}/config`;
const ADMIN_FEATURE_URL = `${ADMIN_CONFIG_URL}/features`;
// -------------------------- END ADMIN --------------------------------------

export {
	// Client
	HOME_URL,
	ABOUT_URL,
	COURSE_URL,
	COURSE_DETAIL_URL,
	RESEARCH_URL,
	RESEARCH_DETAIL_URL,
	PRODUCT_URL,
	PRODUCT_DETAIL_URL,
	CONTACT_URL,
	JOB_URL,
	JOB_DETAIL_URL,
	BLOG_URL,
	BLOG_DETAIL_URL,
	VERIFY_RESET_PASSWORD_URL,

	// Admin
	ADMIN_URL,
	LOGIN_URL,
	DASHBOARD_URL,
	ADMIN_PRODUCT_URL,
	ADMIN_USER_URL,
	ADMIN_FEATURE_URL,
	ADMIN_INSTRUCTOR_URL,
	ADMIN_CUSTOMER_URL,
};

export const generateTreeUrls = (t: any): NavTree[] => {
	const getPathKey = (path: string) => {
		const arr = path.split('/');
		return arr[arr.length - 1];
	};
	return [
		{
			title: t('nav.' + getPathKey(HOME_URL) + 'home'),
			path: HOME_URL,
		},
		{
			title: t('nav.' + getPathKey(PRODUCT_URL)),
			path: PRODUCT_URL,
		},
		{
			title: t('nav.' + getPathKey(RESEARCH_URL)),
			path: RESEARCH_URL,
		},
		{
			title: t('nav.' + getPathKey(COURSE_URL)),
			path: COURSE_URL,
		},
		{
			title: t('nav.' + getPathKey(JOB_URL)),
			path: JOB_URL,
		},
		{
			title: t('nav.' + getPathKey(BLOG_URL)),
			path: BLOG_URL,
		},
		{
			title: t('nav.' + getPathKey(CONTACT_URL)),
			path: CONTACT_URL,
		},
	];
};
