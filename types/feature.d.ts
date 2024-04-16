import { IBaseData } from './global';

export interface IFeature extends IBaseData {
	function_id?: number;
	parent_id: number;
	function_name: string;
	url: string;
	description?: string;
	sort_order: number;
	level: number;
	css_class?: string;
}

export interface ISearchFeatures {
	page_index: number;
	page_size: number;
	search_content: string;
	function_id: number;
	parent_id: number;
}

export interface IFeatureDataNode {
	title: string;
	key: number;
	parent_id: number;
	url: string;
	level: number;
	children: IFeatureDataNode[];
	sort_order: number;
}
