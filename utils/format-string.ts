export const removePrefix = (url: string | undefined, prefix: string) => {
	if (!url) return '';
	return url.replace(prefix, '');
};
