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

export const removeVietnameseTones = (str: string) => {
	// Remove punctuations
	// Bỏ dấu câu, kí tự đặc biệt
	str = str.replace(
		/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|:|;|'|"|&|#|\[|\]|~|\$|_|`|{|}|\||\\/g,
		' ',
	);

	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	str = str.replace(/đ/g, 'd');
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
	str = str.replace(/Đ/g, 'D');
	// Some system encode vietnamese combining accent as individual utf-8 characters
	// Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
	str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
	str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
	// Remove extra spaces
	// Bỏ các khoảng trắng liền nhau
	str = str.replace(/ + /g, ' ');
	str = str.trim();

	return str;
};
