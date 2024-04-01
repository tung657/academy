export type LocalePrefix = 'as-needed' | 'always' | 'never';
export type NavTree = {
	title: string;
	path: string;
	children?: NavTree[];
};
