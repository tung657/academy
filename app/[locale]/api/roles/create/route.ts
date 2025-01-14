import { NextRequest, NextResponse } from 'next/server';

import { createRole } from '@/helpers/repositories/role.repository';
import { IRole } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IRole;
		let dbResults = await createRole(body);
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
