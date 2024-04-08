/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./libs/i18n.ts');

const nextConfig = {
	output: 'standalone',
	// env: {
	// 	BASE_URL: process.env.BASE_URL,
	// 	TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
	// 	JWT_SECRET: process.env.JWT_SECRET,
	// 	MYSQL_HOST: process.env.MYSQL_HOST,
	// 	MYSQL_PORT: process.env.MYSQL_PORT,
	// 	MYSQL_USER: process.env.MYSQL_USER,
	// 	MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
	// 	MYSQL_DATABASE: process.env.MYSQL_DATABASE,
	// },
	experimental: {
		optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
	},
	// other existing configurations here...
	webpack: (config) => {
		const rules = config.module.rules
			.find((rule) => typeof rule.oneOf === 'object')
			.oneOf.filter((rule) => Array.isArray(rule.use));
		rules.forEach((rule) => {
			rule.use.forEach((moduleLoader) => {
				if (
					moduleLoader.loader !== undefined &&
					moduleLoader.loader.includes('css-loader') &&
					typeof moduleLoader.options.modules === 'object'
				) {
					moduleLoader.options = {
						...moduleLoader.options,
						modules: {
							...moduleLoader.options.modules,
							// This is where we allow camelCase class names
							exportLocalsConvention: 'camelCase',
						},
					};
				}
			});
		});

		return config;
	},
};

export default withNextIntl(nextConfig);
