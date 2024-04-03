import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './scss/error.module.css';
import { HOME_URL } from '@/libs/urls';

export function NotFoundTitle() {
	return (
		<Container size="xl" className={classes.root}>
			<div className={classes.label}>404</div>
			<Title className={classes.title}>You have found a secret place.</Title>
			<Text c="dimmed" size="lg" ta="center" className={classes.description}>
				Unfortunately, this is only a 404 page. You may have mistyped the
				address, or the page has been moved to another URL.
			</Text>
			<Group justify="center">
				<a href={HOME_URL}>
					<Button variant="light" size="md">
						Take me back to home page
					</Button>
				</a>
			</Group>
		</Container>
	);
}
