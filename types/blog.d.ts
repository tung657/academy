import { IBaseData, IBaseSearch } from './global';

export interface IBlog extends IBaseData {
	blog_id: number;
	title: string;
	thumbnail: string;
	content: string;
	meta_content: string;
	read_time: string;
	topic_id: number;
	research_type_name: string;
	avatar: string;
	created_user: string;
	created_date_time: string;
	viewed: string;
}

export interface ISearchBlog extends IBaseSearch {
	topic_id?: number;
}
