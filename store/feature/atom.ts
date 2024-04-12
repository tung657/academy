import { IFeatureDataNode } from '@/types';
import { atom } from 'recoil';

export const featureSelectedState = atom<IFeatureDataNode | undefined>({
	key: 'featureSelectedState',
	default: undefined,
});
