import { IBaseData, IBaseSearch } from './global';

export interface IContact extends IBaseData {
	contact_id: number;
	customer_name: string;
	email: string;
	phone_number: string;
	message: string;
}

export interface ISearchContact extends IBaseSearch {}
