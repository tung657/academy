'use client';
import {
	Button,
	ColorSchemeScript,
	Container,
	Flex,
	Group,
	MantineProvider,
	Text,
	Title,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from '@/theme/theme';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html>
			<head>
				<ColorSchemeScript />
				<title>Something went wrong</title>
			</head>
			<body>
				<MantineProvider
					theme={{
						...theme,
						primaryColor: 'primary',
						primaryShade: { light: 6, dark: 7 },
					}}
				>
					<Container size="xl" style={{ height: '100vh' }}>
						<Flex
							justify={'center'}
							align={'center'}
							rowGap={16}
							direction={'column'}
							style={{ height: '100vh' }}
						>
							<Title>Có lỗi xảy ra</Title>

							{/* For dev */}
							<Text c="dimmed" size="xs" ta="center">
								{error.message}.
							</Text>

							<Text c="dimmed" size="lg" ta="center">
								Xin lỗi vì sự bất tiện này. Vui lòng thử lại sau!
							</Text>
							<Group justify="center">
								<Button size="md" onClick={reset}>
									Retry
								</Button>
							</Group>
						</Flex>
					</Container>
				</MantineProvider>
			</body>
		</html>
	);
}
