import { DateInputProps } from '@mantine/dates';
import dayjs from 'dayjs';

export const formatDateShow = 'DD/MM/YYYY';
export const formatDatePost = 'YYYY-MM-DD';

export const dateParser: DateInputProps['dateParser'] = (input) => {
	if (input === 'WW2') {
		return new Date(1939, 8, 1);
	}

	return dayjs(input, formatDateShow).toDate();
};

export const removePrefix = (url: string | undefined, prefix: string) => {
	if (!url) return '';
	return url.replace(prefix, '');
};

export const getUrlDetail = (url?: string, id?: string | number) => {
	if (!url || !id) return '';

	return `${url.replace(':id', '')}${id}`;
};

export const patterns = {
	phone: /(84|0[3|5|7|8|9])+([0-9]{8,12})\b/,
	username: /^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
	password: /^.{6,}$/,
};

export function formatTimeSince(value: string) {
	const seconds = Math.floor(
		(new Date().getTime() - new Date(value).getTime()) / 1000,
	);
	let interval = seconds / 31536000;
	const rtf = new Intl.RelativeTimeFormat('vi', { numeric: 'auto' });
	if (interval > 1) {
		return rtf.format(-Math.floor(interval), 'year');
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return rtf.format(-Math.floor(interval), 'month');
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return rtf.format(-Math.floor(interval), 'day');
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return rtf.format(-Math.floor(interval), 'hour');
	}
	interval = seconds / 60;
	if (interval > 1) {
		return rtf.format(-Math.floor(interval), 'minute');
	}
	return rtf.format(-Math.floor(interval), 'second');
}

export function getReadingTime(html: string): number {
	html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
	html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
	html = html.replace(/<\/div>/gi, '\n');
	html = html.replace(/<\/li>/gi, '\n');
	html = html.replace(/<li>/gi, '  *  ');
	html = html.replace(/<\/ul>/gi, '\n');
	html = html.replace(/<\/p>/gi, '\n');
	html = html.replace(/<br\s*[\/]?>/gi, '\n');
	html = html.replace(/<[^>]+>/gi, '');

	html = html.replace(/\n/g, '');

	return Math.ceil(html.split(' ').length / 224);
}

export const handleGetKeyYB = (yb?: string): string => {
	if (!yb) return '';

	const list = yb.split('/');

	return list[list.length - 1];
};
