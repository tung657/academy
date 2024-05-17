import { IBaseData, IBaseSearch } from './global';

export interface IContact extends IBaseData {
	contact_id: string;
	customer_name: string;
	email: string;
	phone_number: string;
	message: string;
}

export interface ISearchContact extends IBaseSearch {}
