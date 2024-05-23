import { NextRequest, NextResponse } from 'next/server';

import { updateResearch } from '@/helpers/repositories/research.repository';
import { IResearch } from '@/types/research';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IResearch;
		let dbResults = await updateResearch(body);
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
