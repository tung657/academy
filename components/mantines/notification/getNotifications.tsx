import { NotificationData, notifications } from '@mantine/notifications';
import { TitleRender } from '../typographies/TitleRender';
import { Text } from '@mantine/core';

type notificationType = 'success' | 'warning' | 'info' | 'error' | 'default';

export const getNotifications = (
	type: notificationType,
	t: any,
	message?: string,
	title?: string,
) => {
	const config: NotificationData = {
		title: (
			<TitleRender order={4}>
				{title || t(`messages.${type}.title`)}
			</TitleRender>
		),
		message: (
			<Text c={'gray.7'}>{message || t(`messages.${type}.message`)}</Text>
		),
		autoClose: 3000,
	};

	switch (type) {
		case 'success':
			notifications.show({
				...config,
				color: 'green',
			});
			break;
		case 'warning':
			notifications.show({
				...config,
				color: 'orange',
			});
			break;
		case 'error':
			notifications.show({
				...config,
				color: 'red',
			});
			break;
		case 'info':
			notifications.show({
				...config,
				color: 'blue',
			});
			break;
		default:
			notifications.show({
				...config,
				color: 'blue',
			});
			break;
	}
};
