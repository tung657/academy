import { dataCourses } from '@/components/course/data/data-fake';
import { dataJobs } from '@/components/job/data/data-fake';
import { researchTypeOptions } from '@/components/research/data/data-fake';
import { apiClient } from '@/helpers';

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
		'https://web-dev.aiacademy.edu.vn/api/products/search',
	);

	const courseList = dataCourses.map((data) => ({
		url: `/course/${data.id}`,
		lastModified: new Date(),
		alternates: {
			languages: {
				en: `/en/course/${data.id}`,
				vi: `/course/${data.id}`,
			},
		},
	}));

	const researchList = researchTypeOptions.map((data) => ({
		url: `/research/${data.id}`,
		lastModified: new Date(),
		alternates: {
			languages: {
				en: `/en/research/${data.id}`,
				vi: `/research/${data.id}`,
			},
		},
	}));

	const jobsList = dataJobs.map((data) => ({
		url: `/jobs/${data.id}`,
		lastModified: new Date(),
		alternates: {
			languages: {
				en: `/en/jobs/${data.id}`,
				vi: `/jobs/${data.id}`,
			},
		},
	}));

	const productsList = products.data.map((data: any) => ({
		url: `/product/${data.product_id}`,
		lastModified: new Date(),
		alternates: {
			languages: {
				en: `/en/product/${data.product_id}`,
				vi: `/product/${data.product_id}`,
			},
		},
	}));

	return [
		{
			url: '/',
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: '/',
					en: '/en',
				},
			},
			priority: 1,
		},
		{
			url: '/product',
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: '/product',
					en: '/en/product',
				},
			},
		},
		...productsList,

		// course and detail
		{
			url: '/course',
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: '/course',
					en: '/en/course',
				},
			},
		},
		...courseList,

		// research and detail
		{
			url: '/research',
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: '/research',
					en: '/en/research',
				},
			},
		},
		...researchList,

		// jobs and detail
		{
			url: '/jobs',
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: '/jobs',
					en: '/en/jobs',
				},
			},
		},
		...jobsList,

		{
			url: '/blogs',
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: '/blogs',
					en: '/en/blogs',
				},
			},
		},

		{
			url: '/contact',
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: '/contact',
					en: '/en/contact',
				},
			},
		},
	];
}
