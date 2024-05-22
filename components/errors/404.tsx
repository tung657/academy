import { Button, Container, Group, Text, Title } from '@mantine/core';

import { HOME_URL } from '@/libs/urls';

import classes from './scss/error.module.css';

export function NotFoundTitle() {
	return (
		<Container size="xl" className={classes.root}>
			<div className={classes.label}>404</div>
			<Title className={classes.title}>Có vẻ bạn đang bị lạc.</Title>
			<Text size="lg" ta="center" className={classes.description}>
				Thật không may, đây là trang 404. Bạn có thể đã gõ nhầm địa chỉ, hoặc
				trang này đã được di chuyển tới địa chỉ khác.
			</Text>
			<Group justify="center">
				<a href={HOME_URL}>
					<Button variant="light" size="md">
						Đến trang chủ
					</Button>
				</a>
			</Group>
		</Container>
	);
}
