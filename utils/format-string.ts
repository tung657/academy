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
};
