import { MantineColorScheme } from '@mantine/core';
import { atom } from 'recoil';

export const colorSchemeState = atom<MantineColorScheme>({
	key: 'colorSchemeState',
	default: 'light',
});
