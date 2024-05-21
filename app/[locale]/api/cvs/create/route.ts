import { createCV } from '@/helpers/repositories/cv.repository';
import { ICV } from '@/types/cv';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as ICV;
		let dbResults = await createCV(body);
		if (dbResults) {
			return NextResponse.json({
				message: 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ với bạn.',
				success: true,
			});
		} else {
			return NextResponse.json({
				message: 'Gửi yêu cầu thất bại, vui lòng thử lại sau.',
				success: false,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
