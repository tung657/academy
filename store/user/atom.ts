import { IUserStorage } from '@/types';
import { atom } from 'recoil';

export const userState = atom<IUserStorage>({
	key: 'userState',
	default: {
		user_id: '',
		first_name: '',
		last_name: '',
		full_name: '',
		avatar: '',
		email: '',
		phone_number: '',
		position_id: 0,
		features: [],
	},
});
