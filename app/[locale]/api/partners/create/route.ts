import { NextRequest, NextResponse } from 'next/server';

import { createPartner } from '@/helpers/repositories/partner.repository';
import { IPartner } from '@/types/partner';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IPartner;
		let dbResults = await createPartner(body);
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
