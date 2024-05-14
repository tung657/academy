import { getCourseById } from '@/helpers/repositories/course.repository';
import { ICourse } from '@/types/course';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
	_: NextRequest,
	{ params }: { params: { id: string } },
): Promise<NextResponse> {
	try {
		const id = params.id;
		const data = await getCourseById(+id);
		const course = data?.[0]?.[0];
		const course_details = data?.[1];
		if (course) {
			const data: ICourse = course;
			data.course_details = course_details;
			return NextResponse.json(data);
		} else {
			return NextResponse.json({
				message: 'Bản ghi không tồn tại',
				success: false,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
