import { Button, Group } from '@mantine/core';

export default function Page1() {
	return (
		<Group justify="center">
			<Button variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
				Gradient button
			</Button>
			<Button>Primary</Button>
		</Group>
	);
}
