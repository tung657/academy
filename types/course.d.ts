import { IBaseData, IBaseSearch } from './global';
import { IInstructor } from './instructor';

export interface ICourse extends IBaseData {
	course_id: number;
	course_name: string;
	description: string;
	thumbnail: string;
	preview: string;
	overview: string;
	content: string;
	sort_order: number;
	instructor_id: number;
	instructor?: IInstructor;
	course_details: ICourseDetail[];
}

export interface ICourseDetail extends IBaseData {
	id?: string;
	course_detail_id?: number;
	course_id?: string;
	name_detail: string;
	description: string;
	list_videos: string | string[];
	total_time: string;
}

export interface ISearchCourse extends IBaseSearch {}
