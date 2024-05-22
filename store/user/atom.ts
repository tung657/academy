import { atom } from 'recoil';

import { IUserStorage } from '@/types';

export const userState = atom<IUserStorage>({
	key: 'userState',
	default: {
		user_id: '',
		user_name: '',
		first_name: '',
		last_name: '',
		full_name: '',
		avatar: '',
		email: '',
		phone_number: '',
		position_id: 0,
		gender: 0,
		position_name: '',
		date_of_birth: '',
		address: '',
		features: [],
	},
});
