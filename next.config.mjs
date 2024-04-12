/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./libs/i18n.ts');

const nextConfig = {
	output: 'standalone',
	experimental: {
		optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
	},
	// other existing configurations here...
	webpack: (config, { isServer }) => {
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

		if (!isServer) {
			config.resolve = {
				...config.resolve,
				fallback: {
					// fixes proxy-agent dependencies
					net: false,
					tls: false,
				},
			};
		}
		config.module.exprContextCritical = false;

		return config;
	},
};

export default withNextIntl(nextConfig);
