import { NextRequest, NextResponse } from 'next/server';

import { createCourse } from '@/helpers/repositories/course.repository';
import { ICourse } from '@/types/course';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as ICourse;
		let dbResults = await createCourse(body);
		if (dbResults) {
			return NextResponse.json({
				message: 'Thêm mới thành công',
				success: true,
			});
		} else {
			return NextResponse.json({
				message: 'Thêm mới thất bại',
				success: false,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
