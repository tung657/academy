'use client';
import { apiClient } from '@/helpers/api';
import { BASE_URL } from '@/utils';
import { Button, Group, Input } from '@mantine/core';

export function LoginForm() {
	const handleSubmit = (event: any) => {
		event.preventDefault();
		const input1 = event.target[0].value;
		const input2 = event.target[1].value;
		console.log(BASE_URL);
		apiClient
			.post('/auth/login', {
				username: input1,
				password: input2,
			})
			.then((res) => console.log(res.data));
	};

	return (
		<Group justify="center">
			<form onSubmit={handleSubmit}>
				<Input name="username" />
				<Input name="password" />
				<Button type="submit">Submit</Button>
			</form>
		</Group>
	);
}
