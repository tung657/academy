import { NextRequest, NextResponse } from 'next/server';

import { updateCourseRegister } from '@/helpers/repositories/course-register.repository';
import { ICourseRegister } from '@/types/course-register';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as ICourseRegister;
		let dbResults = await updateCourseRegister(body);
		if (dbResults) {
			return NextResponse.json({
				message: 'Cập nhật thành công',
				success: true,
			});
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
