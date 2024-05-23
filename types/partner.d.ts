import { IBaseData, IBaseSearch } from './global';

export interface IPartner extends IBaseData {
	partner_id: number;
	partner_name: string;
	thumbnail: string;
}

export interface ISearchPartner extends IBaseSearch {}
