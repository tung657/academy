import { IBaseData } from './global';

export interface ISlide extends IBaseData {
	slide_id: string;
	slide_caption: string;
	image_big: string;
	image_small: string;
	order: number;
	link_to: string;
}
