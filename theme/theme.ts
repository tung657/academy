import { createTheme, MantineColorsTuple } from '@mantine/core';

const myColor: MantineColorsTuple = [
	'#fff0e4',
	'#ffe0cf',
	'#fac0a1',
	'#f69e6e',
	'#f28043',
	'#f06d27',
	'#f06418',
	'#d6530c',
	'#bf4906',
	'#a73c00',
];

export const theme = createTheme({
	defaultRadius: 'lg',
	colors: {
		primary: myColor,
	},
	headings: {
		fontFamily: 'inherit',
	},
	components: {
		Text: {
			defaultProps: {
				size: 'lg',
				// lh: 1.5,
			},
		},
		TextInput: {
			defaultProps: {
				size: 'md',
			},
		},
		Select: {
			defaultProps: {
				size: 'md',
			},
		},
		Button: {
			defaultProps: {
				size: 'md',
				loaderProps: { type: 'dots' },
				gradient: { from: 'primary.3', to: 'primary.6', deg: 135 },
			},
		},
		Anchor: {
			defaultProps: {
				td: 'none',
			},
		},
	},
});
