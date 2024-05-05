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
