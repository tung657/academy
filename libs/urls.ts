import { NavTree } from '@/types/global';

const HOME_URL = '/';

const ABOUT_URL = '/about-us';

const COURSE_URL = '/course';
const COURSE_DETAIL_URL = `${COURSE_URL}/:id`;

const RESEARCH_URL = '/research';

const PRODUCT_URL = '/product';
const PRODUCT_DETAIL_URL = `${PRODUCT_URL}/:id`;

const CONTACT_URL = '/contact';

const MEDIA_URL = '/media';

export {
	HOME_URL,
	ABOUT_URL,
	COURSE_URL,
	RESEARCH_URL,
	PRODUCT_URL,
	PRODUCT_DETAIL_URL,
	CONTACT_URL,
	MEDIA_URL,
	COURSE_DETAIL_URL,
};

export const generateTreeUrls = (t: any): NavTree[] => {
	const getPathKey = (path: string) => {
		const arr = path.split('/');
		return arr[arr.length - 1];
	};
	return [
		{
			title: t('nav.' + getPathKey(ABOUT_URL)),
			path: ABOUT_URL,
		},
		{
			title: t('nav.' + getPathKey(COURSE_URL)),
			path: COURSE_URL,
		},
		{
			title: t('nav.' + getPathKey(RESEARCH_URL)),
			path: RESEARCH_URL,
		},
		{
			title: t('nav.' + getPathKey(PRODUCT_URL)),
			path: PRODUCT_URL,
		},
		{
			title: t('nav.' + getPathKey(CONTACT_URL)),
			path: CONTACT_URL,
		},
		{
			title: t('nav.' + getPathKey(MEDIA_URL)),
			path: MEDIA_URL,
		},
	];
};
