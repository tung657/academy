import { NextRequest, NextResponse } from 'next/server';

import { updateResearchType } from '@/helpers/repositories/research-type.repository';
import { IResearchType } from '@/types/research-type';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IResearchType;
		let dbResults = await updateResearchType(body);
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
