import { NextRequest, NextResponse } from 'next/server';

import { createCourseRegister } from '@/helpers/repositories/course-register.repository';
import { ICourseRegister } from '@/types/course-register';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as ICourseRegister;
		let dbResults = await createCourseRegister(body);
		if (dbResults) {
			return NextResponse.json({
				message: 'Đăng ký thành công',
				success: true,
			});
		} else {
			return NextResponse.json({
				message: 'Đăng ký thất bại',
				success: false,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
