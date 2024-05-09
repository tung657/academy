import { ORIGIN_URL } from '@/utils/config';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/admin', '/login'],
		},
		sitemap: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/sitemap.xml`,
	};
}
