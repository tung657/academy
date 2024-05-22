import { NextRequest, NextResponse } from 'next/server';

import { updateViewBlog } from '@/helpers/repositories/blog.repository';
import { IBlog } from '@/types/blog';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IBlog;
		let dbResults = await updateViewBlog(body);
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
