import { IBaseData, IBaseSearch } from './global';

export interface ISlide extends IBaseData {
	slide_id: number;
	caption: string;
	btn_label?: string;
	btn_to?: string;
	big_image: string;
	small_image?: string;
	preview_thumbnail?: string;
	preview_link?: string;
	order: number;
}

export interface ISearchSlide extends IBaseSearch {}
