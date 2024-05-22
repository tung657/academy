import '@mantine/carousel/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-react-table/styles.css';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Nunito } from 'next/font/google';
import { Suspense } from 'react';

import '@/assets/scss/index.scss';
import { theme } from '@/theme/theme';
import { AppConfig, ORIGIN_URL } from '@/utils/config';

import GlobalError from './global-error';
import Loading from './loading';

const inter = Nunito({ subsets: ['latin'] });

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'home',
	});

	return {
		title: `${t('meta_title')} | ${AppConfig.name}`,
		description: `${t('meta_description')}`,
		metadataBase: new URL(ORIGIN_URL || 'https://web-dev.aiacademy.edu.vn'),
		openGraph: {
			title: `${t('meta_title')} | ${AppConfig.name}`,
			description: `${t('meta_description')}`,
			url: ORIGIN_URL,
			siteName: AppConfig.name,
			images: [
				{
					url: '/assets/images/home/home.png',
					width: 1800,
					height: 1600,
					alt: `${t('meta_title')} | ${AppConfig.name}`,
				},
			],
			locale: props.params.locale,
			type: 'website',
		},
	};
}

export default function RootLayout({
	children,
	params: { locale },
}: Readonly<{
	children: React.ReactNode;
	params: {
		locale: string;
	};
}>) {
	const messages = useMessages();

	return (
		<html lang={locale || 'vi'}>
			<head>
				<link href="/favicon.ico" rel="icon" type="image/x-icon" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<ColorSchemeScript defaultColorScheme="light" />
			</head>
			<body className={inter.className}>
				<Suspense fallback={<Loading />}>
					<MantineProvider
						theme={{
							...theme,
							primaryColor: 'primary',
							primaryShade: { light: 6, dark: 7 },
						}}
						withGlobalClasses
					>
						<NextIntlClientProvider locale={locale} messages={messages}>
							<ErrorBoundary errorComponent={GlobalError}>
								{children}
							</ErrorBoundary>
						</NextIntlClientProvider>
					</MantineProvider>
				</Suspense>
			</body>
		</html>
	);
}
