import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import '@/assets/scss/index.scss';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '@/theme/theme';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import GlobalError from './global-error';
import { AppConfig } from '@/utils/config';
import { Notifications } from '@mantine/notifications';

const inter = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: AppConfig.name,
	description: 'Generated by create next app',
};

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
		<html lang={locale}>
			<head>
				<link href="/favicon.ico" rel="icon" type="image/x-icon" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<ColorSchemeScript defaultColorScheme="light" />
			</head>
			<body className={inter.className}>
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

							<Notifications position="top-right" zIndex={10000} />
						</ErrorBoundary>
					</NextIntlClientProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
