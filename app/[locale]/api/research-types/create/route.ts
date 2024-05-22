import { NextRequest, NextResponse } from 'next/server';

import { createResearchType } from '@/helpers/repositories/research-type.repository';
import { IResearchType } from '@/types/research-type';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IResearchType;
		let dbResults = await createResearchType(body);
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
