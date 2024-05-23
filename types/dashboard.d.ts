import { IBaseData, IBaseSearch } from './global';

export interface IDashboard extends IBaseData {
	label: string;
	total: number;
	current_month_count: number;
	previous_month_count: number;
	percent_change: number;
}

export interface IDashboardBlog extends IBaseData {
	total_time: number;
	total_viewed: number;
	total: number;
	created_date_time?: string;
	avatar?: string;
	created_user?: string;
}
