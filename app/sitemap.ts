import { dataCourses } from '@/components/course/data/data-fake';
import { dataJobs } from '@/components/job/data/data-fake';
import { researchTypeOptions } from '@/components/research/data/data-fake';

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
			url: '/media',
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: '/media',
					en: '/en/media',
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
