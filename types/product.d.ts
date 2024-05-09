import { IBaseData, IBaseSearch } from './global';

export interface IProduct extends IBaseData {
	product_id: number;
	product_name: string;
	en_product_name: string;
	description: string;
	en_description: string;
	content: string;
	en_content: string;
	sort_order: number;
	thumbnail: string;
	link: string;
	avatar?: string;
	created_user?: string;
	slogan?: string;
	en_slogan?: string;
}

export interface ISearchProduct extends IBaseSearch {}
