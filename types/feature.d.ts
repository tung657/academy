import { IBaseData, IBaseSearch } from './global';

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

export interface ISearchFeatures extends IBaseSearch {
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
