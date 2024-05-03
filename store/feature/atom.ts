import { IFeatureDataNode } from '@/types';
import { atom } from 'recoil';

export const featureSelectedState = atom<IFeatureDataNode | undefined>({
	key: 'featureSelectedState',
	default: undefined,
});

export const roleState = atom<number | undefined>({
	key: 'roleState', // unique ID (with respect to other atoms/selectors)
	default: undefined, // default value (aka initial value)
});
