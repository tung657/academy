import { NextRequest, NextResponse } from 'next/server';

import { updateSlide } from '@/helpers/repositories/slide.repository';
import { ISlide } from '@/types/slide';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as ISlide;
		let dbResults = await updateSlide(body);
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
