type SitemapType = Array<{
	url: string;
	lastModified?: string | Date;
	changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    languages: {}
  }
}>;

export default function sitemap(): SitemapType {
	return [
		{
			url: '/',
			lastModified: new Date(),
			alternates: {
				languages: {
					vi: '/vi',
					en: '/en',
				},
			},
		},
	];
}
