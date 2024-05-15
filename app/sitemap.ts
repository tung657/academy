import { dataJobs } from '@/components/job/data/data-fake';
import { researchTypeOptions } from '@/components/research/data/data-fake';
import { apiClient } from '@/helpers';
import { ORIGIN_URL } from '@/utils/config';

type SitemapType = Array<{
	url: string;
	lastModified?: string | Date;
	changeFrequency?:
		| 'always'
		| 'hourly'
		| 'daily'
		| 'weekly'
		| 'monthly'
		| 'yearly'
		| 'never';
	priority?: number;
	alternates?: {
		languages: {};
	};
}>;

export default async function sitemap(): Promise<SitemapType> {
	const products = await apiClient.post(
		`${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/api/products/search`,
		{},
	);

	const courses = await apiClient.post(
		`${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/api/courses/search`,
		{},
	);

	const researchList = researchTypeOptions.map((data) => ({
		url: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/research/${
			data.id
		}`,
		lastModified: new Date(),
		alternates: {
			languages: {
				en: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/en/research/${
					data.id
				}`,
				vi: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/research/${
					data.id
				}`,
			},
		},
	}));

	const jobsList = dataJobs.map((data) => ({
		url: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/jobs/${data.id}`,
		lastModified: new Date(),
		alternates: {
			languages: {
				en: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/en/jobs/${
					data.id
				}`,
				vi: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/jobs/${
					data.id
				}`,
			},
		},
	}));

	const coursesList =
		courses?.data?.data?.map((data: any) => ({
			url: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/course/${
				data.course_id
			}`,
			lastModified: new Date(),
			alternates: {
				languages: {
					en: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/en/course/${
						data.course_id
					}`,
					vi: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/course/${
						data.course_id
					}`,
				},
			},
		})) || [];

	const productsList =
		products?.data?.data?.map((data: any) => ({
			url: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/product/${
				data.product_id
			}`,
			lastModified: new Date(),
			alternates: {
				languages: {
					en: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/en/product/${
						data.product_id
					}`,
					vi: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/product/${
						data.product_id
					}`,
				},
			},
		})) || [];

	return [
		{
			url: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/`,
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/`,
					en: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/en`,
				},
			},
			priority: 1,
		},
		{
			url: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/product`,
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/product`,
					en: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/en/product`,
				},
			},
		},
		...productsList,

		// course and detail
		{
			url: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/course`,
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/course`,
					en: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/en/course`,
				},
			},
		},
		...coursesList,

		// research and detail
		{
			url: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/research`,
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/research`,
					en: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/en/research`,
				},
			},
		},
		...researchList,

		// jobs and detail
		{
			url: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/jobs`,
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/jobs`,
					en: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/en/jobs`,
				},
			},
		},
		...jobsList,

		{
			url: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/blogs`,
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/blogs`,
					en: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/en/blogs`,
				},
			},
		},

		{
			url: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/contact`,
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/contact`,
					en: `${ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'}/en/contact`,
				},
			},
		},
	];
}
