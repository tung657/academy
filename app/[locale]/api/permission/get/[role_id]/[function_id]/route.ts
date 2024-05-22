import { NextRequest, NextResponse } from 'next/server';

import { getRolePermission } from '@/helpers/repositories/role-permission.repository';

export const dynamic = 'force-dynamic';

export async function GET(
	_: NextRequest,
	{ params }: { params: { role_id: string; function_id: string } },
): Promise<NextResponse> {
	try {
		const roleId = params.role_id;
		const functionId = params.function_id;
		const slide = await getRolePermission(roleId, functionId);
		if (slide) {
			return NextResponse.json(slide);
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
