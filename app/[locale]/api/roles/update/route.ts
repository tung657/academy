import { NextRequest, NextResponse } from 'next/server';

import { updateRole } from '@/helpers/repositories/role.repository';
import { IRole } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IRole;
		let dbResults = await updateRole(body);
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
